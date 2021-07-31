import { Box, Button, Flex, Heading, Icon } from "@chakra-ui/react";
import { RiEmotionSadLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import FollowerCard from "../components/FollowerCard";
import { useMeFollowersQuery } from "../generated/graphql";

function Followers() {
  const { data, loading, error } = useMeFollowersQuery({
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
      <Heading sixe="md">Tus seguidores</Heading>
      <Box maxWidth="700px" w="100%">
        {data?.me.followers.length === 0 && (
          <Flex
            align="center"
            justify="center"
            bg="white"
            p="4"
            direction="column"
            my="10"
          >
            <Heading size="md">Aún no tienes seguidores</Heading>
            <Icon as={RiEmotionSadLine} w="2rem" h="2rem" color="gray.800" />
            <Button as={Link} to="/home" colorScheme="blue" px="10" my="3">
              Volver
            </Button>
          </Flex>
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
