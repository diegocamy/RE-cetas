import { Button, Flex, Grid, Heading, Icon, Text } from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { GiKnifeFork } from "react-icons/gi";
import { RiAddFill } from "react-icons/ri";
import { FaUserFriends, FaUserPlus } from "react-icons/fa";
import StatCard from "./StatCard";

function StatsBox() {
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
      <Button
        rightIcon={<RiAddFill />}
        bg="black"
        color="white"
        borderRadius="xl"
        mb="1"
        _hover={{ background: "blue.500" }}
        _active={{ background: "blue.500" }}
      >
        Crear Receta
      </Button>
      <Grid templateColumns="repeat(2,1fr)" templateRows="repeat(2,1fr)">
        <StatCard icon={GiKnifeFork} qty="10" name="Recetas" />
        <StatCard icon={AiFillHeart} qty="4" name="Favoritas" />
        <StatCard icon={FaUserFriends} qty="3" name="Seguidores" />
        <StatCard icon={FaUserPlus} qty="13" name="Siguiendo" />
      </Grid>
    </Flex>
  );
}

export default StatsBox;
