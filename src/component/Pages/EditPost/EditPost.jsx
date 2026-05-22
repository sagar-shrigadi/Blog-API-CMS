import { useNavigate, useOutletContext, useParams } from "react-router";
import { usePostById } from "../../../service/post/PostById";
import { FetchLoading } from "../../FetchLoading/FetchLoading";
import { FetchError } from "../../FetchError/FetchError";
import { DivWrapper } from "../../Forms/DivWrapper";
import { TinyEditor } from "../../TinyMCE/TinyEditor";
import { editPostById } from "../../../service/post/EditPostById";
import { useState } from "react";

export const EditPost = () => {
  const { postId } = useParams();
  const { token } = useOutletContext();
  const { post, loading, error } = usePostById(postId, null);
  const [EditError, setEditError] = useState(null);
  let navigate = useNavigate();

  const editHandlerSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!window.confirm("Are you sure you want to edit this post?")) {
        return;
      }

      const formData = new FormData(e.currentTarget);

      const title = formData.get("title");
      const content = formData.get("content");
      const isPublished = formData.get("isPublished") === "on";

      console.log("values from form: ", { title, content, isPublished });

      await editPostById(token, postId, title, content, isPublished);
      navigate(`/posts/${postId}`);
    } catch (error) {
      console.error(error);
      setEditError(error);
    }
  };
  if (loading) return <FetchLoading />;
  if (error) return <FetchError />;

  return (
    <section className="grow mx-auto mt-8 flex flex-col gap-8 w-full py-4 px-2 sm:px-6 md:px-8 md:py-4 lg:text-2xl lg:w-5xl lg:px-10 lg:py-8 bg-gray-100 rounded">
      <h1 className="self-start text-4xl italic">Edit Post</h1>
      {EditError && (
        <div>
          <h2>{EditError}</h2>
        </div>
      )}
      <form className="flex flex-col gap-4 px-2" onSubmit={editHandlerSubmit}>
        <DivWrapper>
          <label htmlFor="title" className="tracking-wide">
            Title:{" "}
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="border px-4 py-2 text-xl rounded"
            defaultValue={post?.title}
          />
        </DivWrapper>
        <DivWrapper>
          <label htmlFor="content" className="tracking-wide">
            Content:{" "}
          </label>
          <TinyEditor id="content" name="content" content={post?.content} />
        </DivWrapper>
        <div className="my-2 flex gap-2">
          <input
            type="checkbox"
            id="isPublished"
            name="isPublished"
            className="border rounded-full cursor-pointer w-5"
            defaultChecked={post?.published}
          />
          <label htmlFor="isPublished" className="cursor-pointer tracking-wide">
            Publish
          </label>
        </div>
        <button className="border text-lg px-6 md:px-12 py-2 cursor-pointer rounded self-center">
          Edit
        </button>
      </form>
    </section>
  );
};
