import { Button, Flex, Grid } from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { GiKnifeFork } from "react-icons/gi";
import { RiAddFill } from "react-icons/ri";
import { FaUserFriends, FaUserPlus } from "react-icons/fa";
import StatCard from "./StatCard";
import { Link } from "react-router-dom";

interface Props {
  favourites: number;
  recipes: number;
  followers: number;
  following: number;
  createButton?: boolean;
  linkRecetas?: string;
  linkFavoritos?: string;
  linkFollowers?: string;
  linkFollowing?: string;
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
}: Props) {
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
