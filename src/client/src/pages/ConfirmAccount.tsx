import { useEffect } from "react";
import { useConfirmAccountMutation } from "../generated/graphql";
import { useParams, useHistory } from "react-router";

interface Params {
  token: string;
}

function ConfirmAccount() {
  const [confirm, { loading, error }] = useConfirmAccountMutation();
  const params: Params = useParams();
  const history = useHistory();

  useEffect(() => {
    const confirmAccount = async () => {
      const { token } = params;
      try {
        const { data } = await confirm({ variables: { token } });
        const resp = data?.confirmAccount;

        if (!resp) return;

        console.log(resp.jwt);

        history.replace("/");
      } catch (error) {
        setTimeout(() => {
          history.push("/");
        }, 3000);
        return;
      }
    };

    confirmAccount();
  }, [confirm, params, history]);

  if (loading) return <h1>loading...</h1>;
  if (error) return <h1>{error.message}</h1>;

  return null;
}

export default ConfirmAccount;
