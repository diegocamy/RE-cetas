import { Button, Flex, Grid, useToast } from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { GiKnifeFork } from "react-icons/gi";
import { RiAddFill } from "react-icons/ri";
import { FaUserFriends, FaUserPlus } from "react-icons/fa";
import StatCard from "./StatCard";
import { Link, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import {
  GetUserDocument,
  GetUserQuery,
  useFollowMutation,
  User,
} from "../generated/graphql";
import { AuthContext } from "../App";

interface Props {
  favourites: number;
  recipes: number;
  followers: number;
  following: number;
  createButton?: boolean;
  followButton?: boolean;
  linkRecetas?: string;
  linkFavoritos?: string;
  linkFollowers?: string;
  linkFollowing?: string;
  userFollowers?: ({
    __typename?: "Follow" | undefined;
  } & {
    follower: {
      __typename?: "User" | undefined;
    } & Pick<User, "username">;
  })[];
}

interface Params {
  username: string;
}

function StatsBox({
  favourites,
  followers,
  following,
  recipes,
  createButton,
  linkFavoritos,
  linkFollowers,
  linkFollowing,
  linkRecetas,
  followButton,
  userFollowers,
}: Props) {
  const { username } = useParams<Params>();
  const { user } = useContext(AuthContext);
  const toast = useToast();
  const [follow, { loading }] = useFollowMutation();
  const [isFollowing, setIsFollowing] = useState(() => {
    if (userFollowers) {
      const isFollower = userFollowers.find(
        (e) => e.follower.username === user
      );
      return isFollower ? true : false;
    }

    return false;
  });

  const handleClick = async () => {
    try {
      await follow({
        variables: { username },
        update: async (cache, { data }) => {
          const userData = cache.readQuery<GetUserQuery>({
            query: GetUserDocument,
            variables: { username },
          });

          const newFollowers = isFollowing
            ? userData!.getUser.followers.filter(
                (u) => u.follower.username !== user
              )
            : [...userData!.getUser.followers].concat({
                follower: { username: user },
              });

          cache.writeQuery<GetUserQuery>({
            query: GetUserDocument,
            data: {
              getUser: {
                ...userData!.getUser,
                followers: newFollowers,
                followingCount: isFollowing
                  ? userData!.getUser.followingCount + 1
                  : userData!.getUser.followingCount - 1,
              },
            },
          });
        },
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
      borderRadius="xl"
      width="100%"
      height="100%"
      pos="relative"
      direction="column"
      justify="space-around"
      p={3}
      bgGradient="linear(to-tr, amarillo, #ffe281)"
    >
      {createButton && (
        <Button
          rightIcon={<RiAddFill />}
          as={Link}
          to="/new"
          bg="black"
          color="white"
          borderRadius="xl"
          mb="1"
          _hover={{ background: "blue.500" }}
          _active={{ background: "blue.500" }}
        >
          Crear Receta
        </Button>
      )}
      {user && user !== username && followButton && (
        <Button
          rightIcon={<FaUserPlus />}
          onClick={handleClick}
          bg="black"
          color="white"
          borderRadius="xl"
          mb="1"
          _hover={{ background: "blue.500" }}
          _active={{ background: "blue.500" }}
          isLoading={loading}
        >
          {isFollowing ? "Dejar de seguir" : "Seguir"}
        </Button>
      )}

      <Grid templateColumns="repeat(2,1fr)" templateRows="repeat(2,1fr)">
        <StatCard
          icon={GiKnifeFork}
          qty={recipes}
          name="Recetas"
          link={linkRecetas || "/recipes"}
        />
        <StatCard
          icon={AiFillHeart}
          qty={favourites}
          name="Favoritas"
          link={linkFavoritos || "/favorites"}
        />
        <StatCard
          icon={FaUserFriends}
          qty={followers}
          name="Seguidores"
          link={linkFollowers || "/followers"}
        />
        <StatCard
          icon={FaUserPlus}
          qty={following}
          name="Siguiendo"
          link={linkFollowing || "/following"}
        />
      </Grid>
    </Flex>
  );
}

export default StatsBox;
