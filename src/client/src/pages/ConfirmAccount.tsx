import { useEffect } from "react";
import {
  MeDocument,
  MeQuery,
  useConfirmAccountMutation,
} from "../generated/graphql";
import { useParams, useHistory } from "react-router";
import { setAccessToken } from "../auth/jwt";

interface Params {
  token: string;
}

function ConfirmAccount() {
  const [confirm] = useConfirmAccountMutation();
  const params: Params = useParams();
  const history = useHistory();

  useEffect(() => {
    const confirmAccount = async () => {
      const { token } = params;
      try {
        //confirm account
        const { data } = await confirm({
          variables: { token },

          //log user in
          update: (cache, { data }) => {
            if (!data) {
              return null;
            }

            cache.writeQuery<MeQuery>({
              query: MeDocument,
              data: { me: data.confirmAccount!.user },
            });
          },
        });
        const resp = data?.confirmAccount;

        if (!resp) return;

        //set access token
        setAccessToken(resp.jwt);

        //redirect to profile page
        history.replace("/me");
      } catch (error) {
        history.push("/");

        return;
      }
    };

    confirmAccount();
  }, [confirm, params, history]);

  return null;
}

export default ConfirmAccount;
