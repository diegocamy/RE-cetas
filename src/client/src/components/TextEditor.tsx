import { Box, Flex } from "@chakra-ui/react";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  Editor,
  ContentBlock,
} from "draft-js";
import { useRef, useState, useEffect } from "react";
import "draft-js/dist/Draft.css";
import TextEditorButtons from "./TextEditorButtons";

const myBockStyleFn = (block: ContentBlock) => {
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

function TextEditor() {
  const [editorState, setEditorState] = useState(() => {
    const data = localStorage.getItem("receta");
    if (!data) {
      return EditorState.createEmpty();
    }

    return EditorState.createWithContent(convertFromRaw(JSON.parse(data))); //return editor content from the localstorage
  });
  const editorRef = useRef<Editor>(null);

  //save editor content to localstorage every two seconds if there is content
  useEffect(() => {
    const timeout = setTimeout(() => {
      const state = convertToRaw(editorState.getCurrentContent());
      if (state.blocks.length === 1 && !state.blocks[0].text) {
        return console.log("Is empty");
      }
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
