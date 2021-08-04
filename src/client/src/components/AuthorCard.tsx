import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { AuthContext } from "../App";
import { useFollowMutation, User } from "../generated/graphql";

interface Props {
  username: string;
  avatar: string;
  followers: ({
    __typename?: "Follow" | undefined;
  } & {
    follower: {
      __typename?: "User" | undefined;
    } & Pick<User, "username">;
  })[];
}

function AuthorCard({ avatar, username, followers }: Props) {
  const { user } = useContext(AuthContext);
  const toast = useToast();
  const [follow, { loading }] = useFollowMutation();
  const [isFollowing, setIsFollowing] = useState(() => {
    const isFollower = followers.find((e) => e.follower.username === user);

    return isFollower ? true : false;
  });

  const handleClick = async () => {
    try {
      await follow({
        variables: { username },
      });

      setIsFollowing(!isFollowing);
    } catch (error) {
      toast({
        status: "error",
        description: error.message,
        isClosable: true,
        position: "top",
        title: "Error",
      });
    }
  };

  return (
    <Flex
      background="white"
      p="5"
      height="fit-content"
      width="100%"
      direction="column"
    >
      <Flex align="center" mb="3">
        <Image
          src={avatar}
          borderRadius="50%"
          width="75px"
          height="75px"
          objectFit="cover"
          mr="5"
        />
        <Box>
          <Heading size="lg">{username}</Heading>
          <Text>Se unió hace 15 días</Text>
        </Box>
      </Flex>
      {user && user !== username && (
        <Button
          ml="auto"
          mr="0"
          bgColor="blue.500"
          borderRadius="xl"
          color="white"
          _hover={{ bgColor: "blue.700" }}
          onClick={handleClick}
          isLoading={loading}
        >
          {isFollowing ? "Dejar de seguir" : "Seguir"}
        </Button>
      )}
    </Flex>
  );
}

export default AuthorCard;
