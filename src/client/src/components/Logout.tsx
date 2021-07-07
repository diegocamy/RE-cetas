import { useContext } from "react";
import { AuthContext } from "../App";
import { setAccessToken } from "../auth/jwt";
import { useLogoutMutation } from "../generated/graphql";
import { MenuItem } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

function Logout() {
  const history = useHistory();
  const { setUser } = useContext(AuthContext);
  const [logout, { client }] = useLogoutMutation();

  const handleClick = async () => {
    try {
      await logout({
        update: async (_, __) => {
          setAccessToken("");
          setUser("");
        },
      });
      await client.resetStore();
      history.push("/login");
    } catch (error) {}
  };

  return (
    <MenuItem
      aria-label="Cerrar sesión"
      background="transparent"
      onClick={handleClick}
    >
      Cerrar sesión
    </MenuItem>
  );
}

export default Logout;
