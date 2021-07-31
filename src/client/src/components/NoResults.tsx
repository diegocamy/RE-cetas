import { Flex, Heading, Icon, Button } from "@chakra-ui/react";
import React from "react";
import { RiEmotionSadLine } from "react-icons/ri";
import { Link } from "react-router-dom";

interface Props {
  heading: string;
  buttonText: string;
  buttonLink: string;
}

function NoResults({ buttonLink, buttonText, heading }: Props) {
  return (
    <Flex
      align="center"
      justify="center"
      bg="white"
      p="4"
      direction="column"
      my="10"
    >
      <Heading size="md">{heading}</Heading>
      <Icon as={RiEmotionSadLine} w="2rem" h="2rem" color="gray.800" />
      <Button as={Link} to={buttonLink} colorScheme="blue" px="10" my="3">
        {buttonText}
      </Button>
    </Flex>
  );
}

export default NoResults;
