import { Box, Flex, Heading } from "@chakra-ui/react";
import FollowerCard from "../components/FollowerCard";
import NoResults from "../components/NoResults";
import SpinnerComponent from "../components/Spinner";
import { useMeFollowersQuery } from "../generated/graphql";

function Followers() {
  const { data, loading, error } = useMeFollowersQuery({
    fetchPolicy: "network-only",
  });

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
      <Heading sixe="md">Tus seguidores</Heading>
      <Box maxWidth="700px" w="100%">
        {data?.me.followers.length === 0 && (
          <NoResults
            heading="Aún no tienes seguidores"
            buttonLink="/home"
            buttonText="Volver"
          />
        )}
        {data?.me.followers.map(({ follower: f }) => (
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

export default Followers;
