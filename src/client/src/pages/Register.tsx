import { useState, useRef, FormEvent } from "react";
import { useRegisterMutation } from "../generated/graphql";

function Register() {
  const [success, setSuccess] = useState("");
  const [register, { error }] = useRegisterMutation();
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const username = usernameRef.current!.value;
    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;

    try {
      await register({
        variables: { email, password, username },
      });

      setSuccess(
        "Usuario registrado con exito, por favor, verifique su correo electrónico."
      );
    } catch (error) {
      setSuccess("");
      return;
    }

    usernameRef.current!.value = "";
    emailRef.current!.value = "";
    passwordRef.current!.value = "";
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Nombre de usuario: </label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="john"
          ref={usernameRef}
        />
        <br />
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
        <button type="submit">Registrarse</button>
      </form>
      {error && <p>{error.message}</p>}
      {success && <p>{success}</p>}
    </div>
  );
}

export default Register;
