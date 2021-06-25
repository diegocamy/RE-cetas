import { gql, NetworkStatus, useQuery } from "@apollo/client";

const USERS = gql`
  query {
    users {
      id
      username
      email
    }
  }
`;

interface UserData {
  id: string;
  username: string;
  email: string;
  __typename: string;
}

function Home() {
  const { loading, data, error, refetch } = useQuery(USERS);
  // console.log(JSON.stringify(error, null, 2));
  console.log(data);

  if (loading && !data) return <h1>Loading</h1>;
  if (error) return <h1>Error</h1>;

  return (
    <div>
      {data!.users.map(({ id, username, email }: UserData) => (
        <>
          <div key={id}>
            <p>{id}</p>
            <p>{username}</p>
            <p>{email}</p>
          </div>
          <hr />
        </>
      ))}
      <button onClick={() => refetch()}>REFETCH</button>
    </div>
  );
}

export default Home;
