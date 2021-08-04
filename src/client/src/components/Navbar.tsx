import { useContext } from "react";
import {
  Flex,
  Heading,
  Link,
  Spacer,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../App";
import LoggedUserMenu from "./LoggedUserMenu";
import HamburguerMenu from "./HamburguerMenu";

function Navbar() {
  const { user } = useContext(AuthContext);
  const [isSmallerThan450] = useMediaQuery("(max-width: 450px)");

  return (
    <Stack bgColor="#f7cf1c">
      <Flex
        bgColor="transparent"
        align="center"
        m="auto"
        w="100%"
        maxWidth="1300px"
      >
        <Link
          to={user ? "/home" : "/"}
          _hover={{ textDecoration: "none" }}
          as={NavLink}
          ml="8"
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
        {!isSmallerThan450 && (
          <Link as={NavLink} to="/search" ml="3">
            Buscar
          </Link>
        )}

        <Spacer />
        {user ? (
          <LoggedUserMenu user={user} />
        ) : (
          <>
            {isSmallerThan450 ? (
              <HamburguerMenu />
            ) : (
              <>
                <Link
                  to="/login"
                  bg="transparent"
                  color="black"
                  borderRadius="3xl"
                  mr="2"
                  px="4"
                  py="2"
                  _hover={{
                    textDecoration: "none",
                    backgroundColor: "white",
                  }}
                  as={NavLink}
                >
                  Ingresar
                </Link>
                <Link
                  to="/register"
                  bg="white"
                  color="black"
                  borderRadius="3xl"
                  mr="8"
                  px="4"
                  py="2"
                  _hover={{
                    textDecoration: "none",
                    backgroundColor: "black",
                    color: "white",
                  }}
                  as={NavLink}
                >
                  Registrarse
                </Link>
              </>
            )}
          </>
        )}
      </Flex>
    </Stack>
  );
}

export default Navbar;
