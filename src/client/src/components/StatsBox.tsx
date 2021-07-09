import { Button, Flex, Grid, Heading, Icon, Text } from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { GiKnifeFork } from "react-icons/gi";
import { RiAddFill } from "react-icons/ri";
import { FaUserFriends, FaUserPlus } from "react-icons/fa";

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
        <Flex
          bg="gray.100"
          direction="column"
          align="center"
          justify="center"
          textAlign="center"
          borderRadius="xl"
          color="white"
          bgColor="black"
          m="1"
          p="5"
        >
          <Flex align="center" justify="space-evenly">
            <Icon as={GiKnifeFork} boxSize="7" mr="2" />
            <Heading>0</Heading>
          </Flex>
          <Text fontWeight="bold">Recetas</Text>
        </Flex>
        <Flex
          bg="gray.100"
          direction="column"
          align="center"
          justify="center"
          textAlign="center"
          borderRadius="xl"
          color="white"
          bgColor="black"
          m="1"
        >
          <Flex align="center" justify="space-evenly">
            <Icon as={AiFillHeart} boxSize="7" />
            <Heading>0</Heading>
          </Flex>
          <Text fontWeight="bold">Favoritas</Text>
        </Flex>
        <Flex
          bg="gray.100"
          direction="column"
          align="center"
          justify="center"
          textAlign="center"
          borderRadius="xl"
          color="white"
          bgColor="black"
          m="1"
        >
          <Flex align="center" justify="space-evenly">
            <Icon as={FaUserFriends} boxSize="7" />
            <Heading>0</Heading>
          </Flex>
          <Text fontWeight="bold">Seguidores</Text>
        </Flex>
        <Flex
          bg="gray.100"
          direction="column"
          align="center"
          justify="center"
          textAlign="center"
          borderRadius="xl"
          color="white"
          bgColor="black"
          m="1"
        >
          <Flex align="center" justify="space-evenly">
            <Icon as={FaUserPlus} boxSize="7" />
            <Heading>0</Heading>
          </Flex>
          <Text fontWeight="bold">Suguiendo</Text>
        </Flex>
      </Grid>
    </Flex>
  );
}

export default StatsBox;
