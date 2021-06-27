import { useMeQuery } from "../generated/graphql";

function Me() {
  const { data, loading, error } = useMeQuery();
  if (loading) {
    return <h1>loading...</h1>;
  }

  if (error) {
    console.log(error);
    return <h1>error</h1>;
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
