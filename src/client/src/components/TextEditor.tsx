import { Box, Flex } from "@chakra-ui/react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createToolbarPlugin from "@draft-js-plugins/static-toolbar";
import {
  BoldButton,
  CodeButton,
  HeadlineOneButton,
  OrderedListButton,
  CodeBlockButton,
} from "@draft-js-plugins/buttons";
import { useRef, useState, useEffect } from "react";
import "draft-js/dist/Draft.css";
import "@draft-js-plugins/static-toolbar/lib/plugin.css";

const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;

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
    <Flex direction="column">
      <Box
        w="100%"
        height="70%"
        bgColor="white"
        borderRadius="md"
        border="1px solid lightgray"
        p="2"
        _hover={{ cursor: "text" }}
        onClick={() => {
          editorRef.current?.focus();
        }}
      >
        <Toolbar>
          {
            // may be use React.Fragment instead of div to improve perfomance after React 16
            (externalProps) => (
              <div>
                <BoldButton {...externalProps} />
                <HeadlineOneButton {...externalProps} />
                <CodeButton {...externalProps} />
                <OrderedListButton {...externalProps} />
                <CodeBlockButton {...externalProps} />
              </div>
            )
          }
        </Toolbar>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          placeholder="Tu receta..."
          ref={editorRef}
          plugins={[toolbarPlugin]}
        />
      </Box>
    </Flex>
  );
}

export default TextEditor;
