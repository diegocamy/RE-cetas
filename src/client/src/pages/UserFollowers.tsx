import { Box, Flex, Heading } from "@chakra-ui/react";
import { useContext } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { AuthContext } from "../App";
import FollowerCard from "../components/FollowerCard";
import NoResults from "../components/NoResults";
import SpinnerComponent from "../components/Spinner";
import { useUserFollowersQuery } from "../generated/graphql";

interface Params {
  username: string;
}

function UserFollowers() {
  const { username } = useParams<Params>();
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const { data, loading, error } = useUserFollowersQuery({
    fetchPolicy: "network-only",
    variables: { username },
  });

  if (user === username) {
    return <Redirect to="/followers" />;
  }

  if (!data && error) {
    return <p>{error.message}</p>;
  }

  if (loading && !data) {
    return <SpinnerComponent height="100%" />;
  }

  return (
    <Flex
      bg="gray.100"
      minHeight="100%"
      align="center"
      py="4"
      direction="column"
    >
      <Heading sixe="md">Seguidores de {username}</Heading>
      <Box maxWidth="700px" w="100%">
        {data?.getUser.followers.length === 0 && (
          <NoResults
            buttonLink={history.location.pathname.replace("/followers", "")}
            buttonText="Volver"
            heading={`${username} aún no tiene seguidores`}
          />
        )}
        {data?.getUser.followers.map(({ follower: f }) => (
          <FollowerCard
            followersCount={f.followersCount}
            followingCount={f.followingCount}
            joined={f.created}
            postCount={f.postCount}
            username={f.username}
            avatar={f.avatar}
            bio={f.bio}
            key={f.username}
          />
        ))}
      </Box>
    </Flex>
  );
}

export default UserFollowers;
