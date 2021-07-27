import { RawDraftContentState } from "draft-js";

interface PostContent {
  title: string;
  time: string;
  image: File | string | undefined;
  content: RawDraftContentState;
  imageUrl?: string;
}

export const validatePostContent = (
  values: PostContent,
  toast: any
): Boolean => {
  if (!values.title) {
    toast({
      title: "Error",
      status: "error",
      description: "La receta debe tener un título",
      isClosable: true,
      position: "top",
    });
    return false;
  }

  if (!values.time || values.time === "0") {
    toast({
      title: "Error",
      status: "error",
      description: "Debe ingresar el tiempo de preparacion",
      isClosable: true,
      position: "top",
    });
    return false;
  }

  if (!values.image) {
    toast({
      title: "Error",
      status: "error",
      description: "Debe elegir una imagen",
      isClosable: true,
      position: "top",
    });
    return false;
  }

  if (
    values.content.blocks.length === 1 &&
    values.content.blocks[0].text === ""
  ) {
    toast({
      title: "Error",
      status: "error",
      description: "La receta no puede estar vacía",
      isClosable: true,
      position: "top",
    });
    return false;
  }

  return true;
};
