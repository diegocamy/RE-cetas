import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuGroup,
  MenuItem,
} from "@chakra-ui/react";
import { AiOutlinePlusCircle, AiFillHeart } from "react-icons/ai";
import { FaChevronDown, FaUserFriends, FaUserPlus } from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
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
        <MenuGroup title="Recetas">
          <MenuItem as={NavLink} to="/new" icon={<AiOutlinePlusCircle />}>
            Crear receta
          </MenuItem>
          <MenuItem as={NavLink} to="/recipes" icon={<IoNewspaperOutline />}>
            Mis recetas
          </MenuItem>
          <MenuItem as={NavLink} to="/favorites" icon={<AiFillHeart />}>
            Mis favoritas
          </MenuItem>
          <MenuItem as={NavLink} to="/followers" icon={<FaUserFriends />}>
            Mis seguidores
          </MenuItem>
          <MenuItem as={NavLink} to="/following" icon={<FaUserPlus />}>
            Siguiendo
          </MenuItem>
        </MenuGroup>
        <MenuGroup title="Mi Cuenta">
          <Logout />
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}

export default LoggedUserMenu;
