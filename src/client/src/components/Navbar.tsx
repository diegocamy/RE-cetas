import { useContext } from "react";
import { Flex, Heading, Link, Spacer, Stack, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../App";
import Logout from "./Logout";

function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <Flex bgColor="white" shadow="sm" align="center">
      <Link
        to={user ? "/me" : "/"}
        _hover={{ textDecoration: "none" }}
        as={NavLink}
        ml="8"
        my="3"
        fontWeight="semibold"
      >
        <Heading
          display="inline"
          bg="orange.500"
          color="white"
          borderRadius="md"
          px="2"
          py="1"
          size="md"
        >
          RE
        </Heading>
        <Heading display="inline" color="orange.500" size="md">
          cetas
        </Heading>
      </Link>
      <Spacer />
      {user ? (
        <Stack direction="row" align="center" mr="8">
          <Text>Hola, {user}</Text>
          <Logout />
        </Stack>
      ) : (
        <>
          <Link
            to="/login"
            bg="gray.100"
            color="black"
            borderRadius="sm"
            mr="2"
            p="2"
            _hover={{ textDecoration: "none", backgroundColor: "gray.200" }}
            as={NavLink}
          >
            Ingresar
          </Link>
          <Link
            to="/register"
            bg="orange.500"
            color="white"
            borderRadius="sm"
            mr="8"
            p="2"
            _hover={{ textDecoration: "none", backgroundColor: "orange.400" }}
            as={NavLink}
          >
            Registrarse
          </Link>
        </>
      )}
    </Flex>
  );
}

export default Navbar;
