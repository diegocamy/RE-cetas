import { useContext, useRef } from "react";
import {
  Flex,
  Heading,
  Link,
  Spacer,
  Stack,
  useMediaQuery,
  Button,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  Box,
  Menu,
  MenuButton,
  MenuGroup,
  MenuList,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../App";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaChevronDown } from "react-icons/fa";
import Logout from "./Logout";

function Navbar() {
  const { user } = useContext(AuthContext);
  const [isSmallerThan450] = useMediaQuery("(max-width: 450px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

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
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<FaChevronDown />}
              background="transparent"
              _hover={{ background: "transparent" }}
              _active={{ background: "transparent" }}
            >
              Hola, {user}
            </MenuButton>
            <MenuList>
              <MenuGroup title="Mi Cuenta">
                <Logout />
              </MenuGroup>
            </MenuList>
          </Menu>
        ) : (
          <>
            {isSmallerThan450 ? (
              <>
                <Button
                  ref={btnRef}
                  onClick={onOpen}
                  mr={8}
                  bgColor="black"
                  color="white"
                  border="1px solid black"
                  p="0"
                >
                  <Icon as={GiHamburgerMenu} />
                </Button>
                <Drawer
                  isOpen={isOpen}
                  placement="right"
                  onClose={onClose}
                  finalFocusRef={btnRef}
                >
                  <DrawerOverlay />
                  <DrawerContent bgColor="#f7cf1c" color="black">
                    <DrawerCloseButton />
                    <DrawerHeader>RE cetas</DrawerHeader>

                    <DrawerBody>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        border="1px solid black"
                        p="3"
                        m="1"
                        _active={{ bgColor: "black", color: "white" }}
                        as={NavLink}
                        to="/login"
                        onClick={onClose}
                      >
                        Ingresar
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        border="1px solid black"
                        p="3"
                        _active={{ bgColor: "black", color: "white" }}
                        m="1"
                        as={NavLink}
                        to="/register"
                        onClick={onClose}
                      >
                        Registrarse
                      </Box>
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
              </>
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
