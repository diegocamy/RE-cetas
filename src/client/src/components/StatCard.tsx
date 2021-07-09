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
        <Icon as={icon} boxSize="7" mr="2" />
        <Heading>{qty}</Heading>
      </Flex>
      <Text fontWeight="bold">{name}</Text>
    </Flex>
  );
}

export default StatCard;
