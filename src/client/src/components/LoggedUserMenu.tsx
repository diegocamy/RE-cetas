import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuGroup,
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";
import Logout from "./Logout";

interface Props {
  user: string;
}

function LoggedUserMenu({ user }: Props) {
  return (
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
  );
}

export default LoggedUserMenu;
