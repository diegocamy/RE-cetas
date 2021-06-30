import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../App";
import { setAccessToken } from "../auth/jwt";
import { useLogoutMutation } from "../generated/graphql";

function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const [logout, { client }] = useLogoutMutation();
  let body: JSX.Element | null;

  const handleClick = async () => {
    try {
      await logout({
        update: async (cache, { data }) => {
          setAccessToken("");
          setUser("");
        },
      });
      await client.resetStore();
    } catch (error) {}
  };

  if (user) {
    body = (
      <>
        <li>Welcome, {user}</li>
        <li>
          <button onClick={handleClick}>Log Out</button>
        </li>
      </>
    );
  } else {
    body = (
      <>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/register">Register</NavLink>
        </li>
      </>
    );
  }

  return (
    <header>
      <ul
        style={{
          display: "flex",
          listStyle: "none",
        }}
      >
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/me">Me</NavLink>
        </li>
        <li>
          <NavLink to="/protected">Protected</NavLink>
        </li>
        {body}
      </ul>
    </header>
  );
}

export default Navbar;
