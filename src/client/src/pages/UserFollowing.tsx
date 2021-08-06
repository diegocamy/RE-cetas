import { Box, Flex, Heading } from "@chakra-ui/react";
import FollowerCard from "../components/FollowerCard";
import { useUserFollowingQuery } from "../generated/graphql";
import NoResults from "../components/NoResults";
import SpinnerComponent from "../components/Spinner";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../App";

interface Params {
  username: string;
}

function UserFollowing() {
  const { username } = useParams<Params>();
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const { data, loading, error } = useUserFollowingQuery({
    fetchPolicy: "network-only",
    variables: { username },
  });

  if (user === username) {
    return <Redirect to="/following" />;
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
      <Heading sixe="md">{username} sigue a: </Heading>
      <Box maxWidth="700px" w="100%">
        {data?.getUser.following.length === 0 && (
          <NoResults
            buttonLink={history.location.pathname.replace("/following", "")}
            buttonText="Volver"
            heading={`${username} aún no sigue a nadie`}
          />
        )}
        {data?.getUser.following.map(({ following: f }) => (
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

export default UserFollowing;
