import { Box, Heading, Link, Text, Icon } from "@chakra-ui/react";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../App";

function Footer() {
  const { user } = useContext(AuthContext);
  return (
    <Box bgColor="#f7cf1c" color="black" textAlign="center" py="5">
      <Link
        to={user ? "/me" : "/"}
        _hover={{ textDecoration: "none" }}
        as={RouterLink}
        my="3"
        fontWeight="semibold"
      >
        <Heading
          display="inline"
          bg="black"
          color="white"
          borderRadius="md"
          px="2"
          py="1"
          size="md"
        >
          RE
        </Heading>
        <Heading display="inline" color="black" size="md">
          cetas
        </Heading>
      </Link>
      <Text my="2">Todos los derechos reservados (?)</Text>
    </Box>
  );
}

export default Footer;
