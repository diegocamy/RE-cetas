import { Box, Container, Heading } from "@chakra-ui/react";
import TextEditor from "../components/TextEditor";

function CreateRecipe() {
  return (
    <Box bg="gray.100" py="2" height="100%">
      <Container>
        <Heading textAlign="center">Crears Receta</Heading>
        <TextEditor />
      </Container>
    </Box>
  );
}

export default CreateRecipe;
