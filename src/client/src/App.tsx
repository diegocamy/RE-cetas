import { useState, useEffect } from "react";
import { setAccessToken } from "./auth/jwt";
import Routes from "./Routes";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((token) => {
        setAccessToken(token.jwt);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  if (loading) return null;

  return <Routes />;
}

export default App;
