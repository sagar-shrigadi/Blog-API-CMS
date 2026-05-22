import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export const TinyEditor = ({
  id,
  name,
  content = "<p>This is the initial content of the editor.</p>",
}) => {
  const editorRef = useRef(null);

  return (
    <Editor
      id={id}
      textareaName={name}
      apiKey={import.meta.env.VITE_TINY_KEY}
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue={content}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
    />
  );
};
