import { useRef, FormEvent, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../App";
import { setAccessToken } from "../auth/jwt";
import { useLoginMutation } from "../generated/graphql";

function Login() {
  const { setUser } = useContext(AuthContext);
  const [login, { error, loading }] = useLoginMutation();
  const history = useHistory();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;

    try {
      await login({
        variables: { email, password },
        update: (cache, { data }) => {
          if (!data) return null;

          const username = data.login.user.username;
          setAccessToken(data.login.jwt!);
          setUser(username);
          history.replace("/me");
        },
      });
    } catch (error) {
      return;
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Correo Electrónico: </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="john@gmail.com"
          ref={emailRef}
        />
        <br />
        <label htmlFor="password">Contraseña: </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Contraseña"
          ref={passwordRef}
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
      {error && <p>{error.message}</p>}
    </div>
  );
}

export default Login;
