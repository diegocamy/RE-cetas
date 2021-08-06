import { useContext } from "react";
import { AuthContext } from "../App";
import { setAccessToken } from "../auth/jwt";
import {
  useLogoutMutation,
  useInvalidateRefreshTokensMutation,
} from "../generated/graphql";
import { MenuItem } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

function Logout() {
  const history = useHistory();
  const { setUser } = useContext(AuthContext);
  const [logout, { client }] = useLogoutMutation();
  const [invalidateTokens] = useInvalidateRefreshTokensMutation();

  const handleClick = async () => {
    try {
      await invalidateTokens();

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
      icon={<FiLogOut />}
    >
      Cerrar sesión
    </MenuItem>
  );
}

export default Logout;
