import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";

function HamburguerMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  return (
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
  );
}

export default HamburguerMenu;
