import { useContext } from "react";
import {
  Flex,
  Heading,
  Link,
  Spacer,
  Stack,
  Text,
  useMediaQuery,
  Menu,
  Icon,
  MenuItem,
  MenuList,
  Button,
  MenuButton,
  Tooltip,
} from "@chakra-ui/react";
import { FiLogIn } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../App";
import Logout from "./Logout";

function Navbar() {
  const { user } = useContext(AuthContext);
  const [isSmallerThan450] = useMediaQuery("(max-width: 450px)");

  return (
    <Stack>
      <Flex
        bgColor="transparent"
        align="center"
        m="auto"
        w="100%"
        maxWidth="1300px"
      >
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
        <Spacer />
        {user ? (
          <Stack direction="row" align="center" mr="8">
            <Text>Hola, {user}</Text>
            <Logout />
          </Stack>
        ) : (
          <>
            {isSmallerThan450 ? (
              <Menu closeOnBlur>
                {({ isOpen }) => (
                  <>
                    <Tooltip
                      label="Ingresar o Registrarse"
                      hasArrow
                      openDelay={300}
                    >
                      <MenuButton
                        as={Button}
                        mr="8"
                        background="white"
                        isActive={isOpen}
                      >
                        {isOpen ? (
                          <Icon as={MdClose} w={7} h={7} />
                        ) : (
                          <Icon as={FiLogIn} w={7} h={7} />
                        )}
                      </MenuButton>
                    </Tooltip>
                    <MenuList>
                      <MenuItem as={NavLink} to="/login">
                        Ingresar
                      </MenuItem>
                      <MenuItem as={NavLink} to="/register">
                        Registrarse
                      </MenuItem>
                    </MenuList>
                  </>
                )}
              </Menu>
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
