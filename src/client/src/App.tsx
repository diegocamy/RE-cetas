import { useState, useEffect, createContext } from "react";
import { setAccessToken } from "./auth/jwt";
import Routes from "./Routes";

interface IContext {
  user: string;
  setUser: (value: React.SetStateAction<string>) => void;
}

export const AuthContext = createContext<IContext>({ user: "", setUser() {} });

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((token) => {
        setAccessToken(token.jwt);
        setUser(token.user);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Routes />
    </AuthContext.Provider>
  );
}

export default App;
