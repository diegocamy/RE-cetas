import { useGetUsersQuery } from "./generated/graphql";

function Home() {
  const { loading, data, error } = useGetUsersQuery();

  if (loading && !data) return <h1>Loading</h1>;
  if (error) return <h1>Error</h1>;

  return (
    <div>
      {data!.users.map(({ id, username, email, likedPosts, posts }) => (
        <div key={id}>
          <div>
            <p>id: {id}</p>
            <p>username: {username}</p>
            <p>email: {email}</p>
            <p>liked posts: {likedPosts.length}</p>
            <p>posts</p>
            <>
              {posts.map((p) => {
                return (
                  <div key={p.id}>
                    <p>title: {p.title}</p>
                    <p>likes: {p.likeCount}</p>
                  </div>
                );
              })}
            </>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Home;
