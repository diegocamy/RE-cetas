import { useContext } from "react";
import { AuthContext } from "../App";
import { setAccessToken } from "../auth/jwt";
import { useLogoutMutation } from "../generated/graphql";
import { Tooltip, Icon, IconButton } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
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
    <Tooltip hasArrow label="Cerrar sesión" openDelay={300}>
      <IconButton
        icon={<Icon as={FiLogOut} />}
        aria-label="Cerrar sesión"
        borderRadius="md"
        size="sm"
        onClick={handleClick}
        _hover={{ backgroundColor: "orange.300" }}
      />
    </Tooltip>
  );
}

export default Logout;
