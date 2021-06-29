import { useRef, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import { setAccessToken } from "../auth/jwt";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";

function Login() {
  const [login, { error, loading }] = useLoginMutation();
  const history = useHistory();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;

    try {
      const { data } = await login({
        variables: { email, password },
        update: (cache, { data }) => {
          if (!data) {
            return null;
          }

          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              me: data.login.user!,
            },
          });
        },
      });

      setAccessToken(data?.login.jwt!);

      return history.replace("/me");
    } catch (error) {
      console.log(error);
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
