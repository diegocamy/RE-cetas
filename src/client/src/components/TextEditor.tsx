import { Box, Flex } from "@chakra-ui/react";
import { EditorState, convertToRaw, Editor, ContentBlock } from "draft-js";
import { useRef, useEffect } from "react";
import "draft-js/dist/Draft.css";
import TextEditorButtons from "./TextEditorButtons";

interface Props {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
}

export const myBockStyleFn = (block: ContentBlock) => {
  const type = block.getType();
  switch (type) {
    case "blockquote": {
      return "tip";
    }
    case "header-three": {
      return "subtitulo";
    }
    case "ordered-list-item": {
      return "lista";
    }
    default:
      return type;
  }
};

function TextEditor({ editorState, setEditorState }: Props) {
  const editorRef = useRef<Editor>(null);

  //save editor content to localstorage every two seconds if there is content
  useEffect(() => {
    const timeout = setTimeout(() => {
      const state = convertToRaw(editorState.getCurrentContent());

      localStorage.setItem("receta", JSON.stringify(state));
    }, 2000);

    return () => clearTimeout(timeout);
  }, [editorState]);

  return (
    <Flex direction="column" maxH="450px">
      <TextEditorButtons
        editorState={editorState}
        setEditorState={setEditorState}
      />
      <Box
        w="100%"
        overflowY="auto"
        bgColor="white"
        borderRadius="md"
        border="1px solid lightgray"
        p="2"
        _hover={{ cursor: "text" }}
        onClick={() => {
          editorRef.current?.focus();
        }}
      >
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          placeholder="Tu receta..."
          ref={editorRef}
          blockStyleFn={myBockStyleFn}
        />
      </Box>
    </Flex>
  );
}

export default TextEditor;
