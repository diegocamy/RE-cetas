import { Flex, Icon, Heading, Text } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

interface Props {
  icon: IconType;
  qty: number;
  name: string;
}

function StatCard({ icon, qty, name }: Props) {
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
