import { Flex, Tooltip, IconButton } from "@chakra-ui/react";
import { EditorState, RichUtils } from "draft-js";
import { AiOutlineOrderedList } from "react-icons/ai";
import { BiBold } from "react-icons/bi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { MdTitle } from "react-icons/md";

interface Props {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
}

function TextEditorButtons({ editorState, setEditorState }: Props) {
  return (
    <Flex
      justify="center"
      bgColor="white"
      mb="1"
      width="fit-content"
      mx="auto"
      position="sticky"
      top="5"
      zIndex="2"
    >
      <Tooltip aria-label="Consejo" label="Consejo">
        <IconButton
          aria-label="Consejo"
          icon={<HiOutlineLightBulb />}
          fontSize="xl"
          onMouseDown={(e) => {
            e.preventDefault();
            const newState = RichUtils.toggleBlockType(
              editorState,
              "blockquote"
            );
            setEditorState(newState);
          }}
        />
      </Tooltip>
      <Tooltip aria-label="Negrita" label="Negrita">
        <IconButton
          aria-label="Negrita"
          icon={<BiBold />}
          fontSize="xl"
          onMouseDown={(e) => {
            e.preventDefault();
            const newState = RichUtils.toggleInlineStyle(editorState, "BOLD");
            setEditorState(newState);
          }}
        />
      </Tooltip>
      <Tooltip aria-label="Título" label="Título">
        <IconButton
          aria-label="Título"
          icon={<MdTitle />}
          fontSize="xl"
          onMouseDown={(e) => {
            e.preventDefault();
            const newState = RichUtils.toggleBlockType(
              editorState,
              "header-three"
            );
            setEditorState(newState);
          }}
        />
      </Tooltip>
      <Tooltip aria-label="Lista enumerada" label="Lista enumerada">
        <IconButton
          aria-label="Lista enumerada"
          icon={<AiOutlineOrderedList />}
          fontSize="xl"
          onMouseDown={(e) => {
            e.preventDefault();
            const newState = RichUtils.toggleBlockType(
              editorState,
              "ordered-list-item"
            );
            setEditorState(newState);
          }}
        />
      </Tooltip>
    </Flex>
  );
}

export default TextEditorButtons;
