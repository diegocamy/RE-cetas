import { Box, Flex, Heading, Icon } from "@chakra-ui/react";
import FollowerCard from "../components/FollowerCard";
import { useMeFollowingQuery } from "../generated/graphql";
import { RiEmotionSadLine } from "react-icons/ri";

function Following() {
  const { data, loading, error } = useMeFollowingQuery({
    fetchPolicy: "network-only",
  });

  if (!data && error) {
    return <p>{error.message}</p>;
  }

  if (loading && !data) {
    return <p>loading</p>;
  }

  return (
    <Flex
      bg="gray.100"
      minHeight="100%"
      align="center"
      py="4"
      direction="column"
    >
      <Heading sixe="md">Siguiendo</Heading>
      <Box maxWidth="700px" w="100%">
        {data?.me.following.length === 0 && (
          <Flex
            align="center"
            justify="center"
            bg="white"
            p="4"
            direction="column"
            my="10"
          >
            <Heading size="md">Aún no sigues a nadie</Heading>
            <Icon as={RiEmotionSadLine} w="2rem" h="2rem" color="gray.800" />
          </Flex>
        )}
        {data?.me.following.map(({ following: f }) => (
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

export default Following;
