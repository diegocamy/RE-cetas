import { useEffect } from "react";
import { useMeLazyQuery } from "../generated/graphql";

function Me() {
  const [executeQuery, { loading, error, data }] = useMeLazyQuery();

  useEffect(() => {
    let _isMounted = true;

    if (_isMounted) {
      executeQuery();
    }

    return () => {
      _isMounted = false;
    };
  }, [executeQuery]);

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
      <h1>WELCOME TO YOUR PROFILE PAGE</h1>
      <p>{data.me.email}</p>
      <p>{data.me.username}</p>
    </div>
  );
}

export default Me;
