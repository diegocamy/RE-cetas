import { NavLink } from "react-router-dom";
import { setAccessToken } from "../auth/jwt";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";

function Navbar() {
  const { data, loading } = useMeQuery({ notifyOnNetworkStatusChange: true });
  const [logout, { client }] = useLogoutMutation();
  let body: JSX.Element | null;

  const handleClick = async () => {
    try {
      await logout();
      setAccessToken("");
      await client.resetStore();
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) {
    body = null;
  } else if (data && data.me) {
    body = (
      <>
        <li>Welcome, {data.me.username}</li>
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
