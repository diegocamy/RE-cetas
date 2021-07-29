import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import { es } from "date-fns/locale";
import { Link } from "react-router-dom";

interface Props {
  username: string;
  avatar?: string;
  bio?: string;
  joined: string;
  postCount: number;
  followingCount: number;
  followersCount: number;
}

function FollowerCard({
  avatar,
  username,
  bio,
  followersCount,
  followingCount,
  joined,
  postCount,
}: Props) {
  return (
    <Flex
      bgColor="white"
      p="4"
      my="2"
      as={Link}
      to={`/user/${username}`}
      minHeight="120px"
      align="center"
    >
      <Image
        src={avatar}
        borderRadius="50%"
        width="75px"
        height="75px"
        mr="5"
      />
      <Box flexGrow={1}>
        <Heading size="md">{username}</Heading>
        <Text>{bio}</Text>
        <Text>
          Se unió hace{" "}
          {joined &&
            formatDistance(new Date(joined), new Date(), {
              locale: es,
            })}
        </Text>
        <Flex flexWrap="wrap" textAlign="center">
          <Text
            bg="blue.500"
            color="white"
            px="2"
            py="1"
            borderRadius="md"
            flexGrow={1}
            mr="1"
            mb="1"
          >
            Recetas: {postCount}
          </Text>
          <Text
            bg="blue.500"
            color="white"
            px="2"
            py="1"
            borderRadius="md"
            flexGrow={1}
            mr="1"
            mb="1"
          >
            Seguidores: {followersCount}
          </Text>
          <Text
            bg="blue.500"
            color="white"
            px="2"
            py="1"
            borderRadius="md"
            flexGrow={1}
            mr="1"
            mb="1"
          >
            Siguiendo: {followingCount}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
}

export default FollowerCard;
