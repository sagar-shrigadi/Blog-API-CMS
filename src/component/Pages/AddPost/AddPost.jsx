import { useState } from "react";
import { DivWrapper } from "../../Forms/DivWrapper";
import { CreateNewPost } from "../../../service/post/CreateNewPost";
import { useLocation, useNavigate, useOutletContext } from "react-router";
import { TinyEditor } from "../../TinyMCE/TinyEditor";

export const AddNewPost = () => {
  const { token } = useOutletContext();
  const [title, setTitle] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  let navigate = useNavigate();
  const location = useLocation();
  //   console.log("title: ", title);
  //   console.log("isPublished: ", isPublished);

  const newPostHandleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      navigate("/login", {
        replace: true,
        state: { from: location.pathname },
      });
    } else {
      const formData = new FormData(e.currentTarget);
      const content = formData.get("content");
      //   console.log("content: ", content);
      const response = await CreateNewPost(token, title, content, isPublished);
      console.log("response new post", response);
      navigate("/");
    }
  };
  return (
    <section className="grow mx-auto mt-8 flex flex-col gap-8 w-full py-4 px-2 sm:px-6 md:px-8 md:py-4 lg:text-2xl lg:w-5xl lg:px-10 lg:py-8 bg-gray-100 rounded">
      <h1 className="self-start text-4xl italic">New Post</h1>
      <form className="flex flex-col gap-4 px-2" onSubmit={newPostHandleSubmit}>
        <DivWrapper>
          <label htmlFor="title" className="tracking-wide">
            Title:{" "}
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Post Title"
            className="border px-4 py-2 text-xl rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </DivWrapper>
        <DivWrapper>
          <label htmlFor="content" className="tracking-wide">
            Content:{" "}
          </label>
          <TinyEditor id="content" name="content" />
        </DivWrapper>
        <div className="my-2 flex gap-2">
          <input
            type="checkbox"
            id="isPublished"
            name="isPublished"
            className="border rounded-full cursor-pointer w-5"
            checked={isPublished}
            onChange={() => setIsPublished(!isPublished)}
          />
          <label htmlFor="isPublished" className="cursor-pointer tracking-wide">
            Publish
          </label>
        </div>
        <button className="border text-lg px-6 md:px-12 py-2 cursor-pointer rounded self-center">
          Submit
        </button>
      </form>
    </section>
  );
};
