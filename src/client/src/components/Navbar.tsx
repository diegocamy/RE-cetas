import { NavLink, useHistory } from "react-router-dom";
import { setAccessToken } from "../auth/jwt";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";

function Navbar() {
  const history = useHistory();
  const { data, loading } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();
  let body: JSX.Element | null;

  const handleClick = async () => {
    try {
      const { data } = await logout();
      if (!data) {
        return null;
      }
      setAccessToken(data.logout.jwt);
      if (!client) {
        return null;
      }

      //TODO: CLEAR CACHE

      // client.clearStore().then(() => {
      //   client.resetStore();
      //   history.push("/login");
      // });
    } catch (error) {
      console.log(error);
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
        {body}
      </ul>
    </header>
  );
}

export default Navbar;
