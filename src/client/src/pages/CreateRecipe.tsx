import { Box, Button, Heading } from "@chakra-ui/react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import { useState } from "react";

function CreateRecipe() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  return (
    <Box>
      <Heading textAlign="center">Crear Receta</Heading>
      <Button
        color="blue.500"
        onClick={() => {
          const nextState = RichUtils.toggleInlineStyle(editorState, "ITALIC");
          setEditorState(nextState);
        }}
      >
        Italic
      </Button>
      <Button
        color="blue.500"
        onClick={() => {
          const nextState = RichUtils.toggleInlineStyle(
            editorState,
            "UNDERLINE"
          );
          setEditorState(nextState);
        }}
      >
        Underline
      </Button>
      <Button
        color="blue.500"
        onClick={() => {
          const nextState = RichUtils.toggleInlineStyle(editorState, "BOLD");
          setEditorState(nextState);
        }}
      >
        Bold
      </Button>
      <Editor editorState={editorState} onChange={setEditorState} />;
    </Box>
  );
}

export default CreateRecipe;
