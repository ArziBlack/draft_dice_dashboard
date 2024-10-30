import React, { FC } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface IQuill {
  content: string;
  handleContentChange: (value: string) => void;
}
const QuillEditor: FC<IQuill> = ({
  content,
  handleContentChange,
}): React.JSX.Element => {
  return (
    <div className="">
      <h2 className="text-center">Quill Editor in React</h2>
      <ReactQuill
        value={content}
        onChange={handleContentChange}
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["link", "image", "video"],
            ["clean"],
          ],
        }}
        formats={[
          "header",
          "font",
          "size",
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "list",
          "bullet",
          "indent",
          "link",
          "image",
          "video",
        ]}
      />
      <div className="flex flex-col items-start justify-start w-full">
        <h3>Editor Content:</h3>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default QuillEditor;
