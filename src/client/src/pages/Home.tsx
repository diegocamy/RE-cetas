import { useContext } from "react";
import { AuthContext } from "../App";

function Home() {
  const { user } = useContext(AuthContext);

  return <div>{user && <p>Hello {user}</p>}Home</div>;
}

export default Home;
