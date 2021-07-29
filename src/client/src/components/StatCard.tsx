import { Flex, Icon, Heading, Text } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";
import { Link } from "react-router-dom";

interface Props {
  icon: IconType;
  qty: number;
  name: string;
  link: string;
}

function StatCard({ icon, qty, name, link }: Props) {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      textAlign="center"
      borderRadius="xl"
      color="white"
      bgColor="black"
      _hover={{ backgroundColor: "blue.500", cursor: "pointer" }}
      m="1"
      p="5"
      as={Link}
      to={link}
    >
      <Flex align="center" justify="space-evenly">
        <Icon as={icon} boxSize="7" mr="2" />
        <Heading>{qty}</Heading>
      </Flex>
      <Text fontWeight="bold">{name}</Text>
    </Flex>
  );
}

export default StatCard;
