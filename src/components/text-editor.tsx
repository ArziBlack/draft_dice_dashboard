import React, { useCallback, useMemo } from "react";
import { Editor, Transforms, Text, EditorInterface } from "slate";
import { Editable, RenderLeafProps } from "slate-react";

interface CustomText {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  text: string;
}

interface LeafProps extends RenderLeafProps {
  leaf: CustomText;
  children: React.ReactNode;
}

const Leaf: React.FC<LeafProps> = (props) => {
  return (
    <span
      {...props.attributes}
      style={{
        fontWeight: props.leaf.bold ? "bold" : "normal",
        fontStyle: props.leaf.italic ? "italic" : "normal",
        textDecoration: props.leaf.underline ? "underline" : "none"
      }}
    >
      {props.children}
    </span>
  );
};

const TextEditor: React.FC = () => {
  const editor = useMemo(() => withEditor(Editor), []);

  const isCustomText = (n: any): n is CustomText => {
    return Text.isText(n) && (n.bold !== undefined || n.italic !== undefined || n.underline !== undefined);
  };

  const changeMark = (mark: keyof CustomText) => {
    const [match] = Editor.nodes(editor, {
      match: (n) => isCustomText(n) && n[mark] === true,
    });

    Transforms.setNodes(
      editor,
      { [mark]: !match },
      { match: (n) => Text.isText(n), split: true }
    );
  };

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!event.ctrlKey) return;

    event.preventDefault();

    switch (event.key) {
      case "b":
        changeMark("bold");
        break;
      case "i":
        changeMark("italic");
        break;
      case "u":
        changeMark("underline");
        break;
      default:
        break;
    }
  };

  return (
    <Editable
      renderLeaf={renderLeaf}
      onKeyDown={onKeyDown}
    />
  );
};

export default TextEditor;
function withEditor(Editor: EditorInterface): any {
    throw new Error("Function not implemented.");
}

