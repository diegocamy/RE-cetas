import { useEffect, useContext } from "react";
import { useConfirmAccountMutation } from "../generated/graphql";
import { useParams, useHistory } from "react-router";
import { setAccessToken } from "../auth/jwt";
import { AuthContext } from "../App";

interface Params {
  token: string;
}

function ConfirmAccount() {
  const { setUser } = useContext(AuthContext);
  const [confirm, { error }] = useConfirmAccountMutation();
  const params = useParams<Params>();
  const history = useHistory();

  useEffect(() => {
    confirm({ variables: { token: params.token } })
      .then((data) => {
        const jwt = data.data!.confirmAccount!.jwt;
        const username = data.data!.confirmAccount!.user.username;

        setAccessToken(jwt);
        setUser(username);

        history.replace("/home");
      })
      .catch((e) => {});
  }, [confirm, history, params.token, setUser]);

  if (error) {
    setTimeout(() => {
      history.replace("/");
    }, 2000);
    return <p>{error && error.message}, volviendo a la página principal...</p>;
  }

  return null;
}

export default ConfirmAccount;
