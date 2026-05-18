import { useState } from "react";
import { DivWrapper } from "../../Forms/DivWrapper";
import { CreateNewPost } from "../../../service/post/CreateNewPost";
import { useNavigate, useOutletContext } from "react-router";

export const AddNewPost = () => {
  const { token } = useOutletContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  let navigate = useNavigate();
  //   console.log("title: ", title);
  //   console.log("content: ", content);
  //   console.log("isPublished: ", isPublished);

  const newPostHandleSubmit = async (e) => {
    e.preventDefault();
    const response = await CreateNewPost(token, title, content, isPublished);
    console.log("response new post", response);
    navigate("/");
  };
  return (
    <section className="grow mx-auto mt-8 flex flex-col gap-8 w-full py-1 px-2 lg:text-2xl lg:w-5xl lg:py-2.5">
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
            className="border px-2 py-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </DivWrapper>
        <DivWrapper>
          <label htmlFor="content" className="tracking-wide">
            Content:{" "}
          </label>
          <textarea
            name="content"
            id="content"
            cols="3"
            rows="8"
            className="border px-2 py-1"
            placeholder="Post Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </DivWrapper>
        <div className="flex gap-2">
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
        <button className="border px-4 py-2 cursor-pointer">Submit</button>
      </form>
    </section>
  );
};
