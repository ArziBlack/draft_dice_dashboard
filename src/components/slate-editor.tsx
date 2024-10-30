import React, { useCallback, useMemo, useState } from "react";
import { Slate, Editable, withReact } from "slate-react";
import { createEditor, Descendant } from "slate";

const SlateEditor: React.FC = (): React.JSX.Element => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<
    { type: string; children: { text: string }[] }[] | Descendant[]
  >([
    {
      type: "paragraph",
      children: [{ text: "Start typing your content here..." }],
    },
  ]);
  const handleChange = useCallback((newValue: Descendant[]) => {
    setValue(newValue);
  }, []);

  const CodeElement = (props) => {
    return (
      <pre {...props.attributes}>
        <code>{props.children}</code>
      </pre>
    );
  };
  const DefaultElement = (props) => {
    return <p {...props.attributes}>{props.children}</p>;
  };
  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);
  return (
      <Slate editor={editor} initialValue={value} onChange={handleChange}>
      <Editable
        placeholder="Write your post content..."
        className="border p-2 mt-2 rounded"
        // renderElement={renderElement}
      />
    </Slate>
  );
};

export default SlateEditor;
