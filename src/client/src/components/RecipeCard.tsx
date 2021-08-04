import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

interface Props {
  img: string;
  title: string;
  duration: string;
  slug?: string;
  width: string;
  borderRadius?: boolean;
  marginY?: boolean;
  marginRight?: boolean;
}

function RecipeCard({
  img,
  title,
  duration,
  slug,
  borderRadius,
  width,
  marginY,
  marginRight,
}: Props) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      width={width}
      height="180px"
      borderRadius={borderRadius ? "2xl" : "none"}
      position="relative"
      px="3"
      py="2"
      bgImage={img}
      backgroundSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      transition="all .5s ease-in"
      _hover={{ backgroundSize: "105%", cursor: "pointer" }}
      boxShadow="base"
      as={slug ? Link : Box}
      to={slug && `/recipe/${slug}`}
      my={marginY ? "2" : "none"}
      mr={marginRight ? "2" : "none"}
    >
      <Box
        borderRadius="inherit"
        bgGradient="linear(to-t,rgba(0,0,0,0.9),transparent,transparent,rgba(0,0,0,0.9))"
        position="absolute"
        top="0"
        left="0"
        height="100%"
        width="100%"
        zIndex="0"
      />
      <Text color="white" zIndex="1" fontSize="xl">
        {title}
      </Text>
      <Flex justifyContent="space-between" zIndex="1">
        <div />
        <Flex color="white" align="center">
          <Icon as={AiOutlineClockCircle} boxSize="6" mr="2" />
          {duration || 45} min
        </Flex>
      </Flex>
    </Box>
  );
}

export default RecipeCard;
