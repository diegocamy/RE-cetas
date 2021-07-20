import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import notFound from "../assets/404.svg";

function NotFound() {
  return (
    <Flex minHeight="100%" justify="center" align="center" direction="column">
      <Heading mb="10">Página no encontrada</Heading>
      <Box maxWidth="350px" w="100%" textAlign="center">
        <Image src={notFound} width="100%" />
      </Box>
    </Flex>
  );
}

export default NotFound;
