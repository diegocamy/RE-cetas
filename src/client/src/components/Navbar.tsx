import { NavLink } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";

function Navbar() {
  const { data, loading } = useMeQuery();
  let body: JSX.Element | null;

  const handleClick = () => {};

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
        {body}
      </ul>
    </header>
  );
}

export default Navbar;
