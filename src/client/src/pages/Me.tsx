import { useMeQuery } from "../generated/graphql";
import { useHistory } from "react-router-dom";

function Me() {
  const history = useHistory();
  const { data, loading, error } = useMeQuery({ fetchPolicy: "network-only" });

  if (error && error.message === "Unauthorized") {
    history.push("/login");
  }
  if (error) {
    return <h1>error</h1>;
  }

  if (loading) {
    return <h1>loading...</h1>;
  }

  if (!data) {
    return <h1>no data...</h1>;
  }

  return (
    <div>
      <p>{data.me.email}</p>
      <p>{data.me.username}</p>
    </div>
  );
}

export default Me;
