import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Props {
  username: string;
  avatar: string;
}

function AuthorCard({ avatar, username }: Props) {
  return (
    <Flex
      background="white"
      p="5"
      height="fit-content"
      width="100%"
      direction="column"
      position="sticky"
      top="2"
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
      <Button
        width="100%"
        bgColor="blue.500"
        borderRadius="xl"
        color="white"
        _hover={{ bgColor: "blue.700" }}
        mb="2"
        as={Link}
        to={`/user/${username}`}
      >
        Ver mas recetas de {username}
      </Button>
      <Button
        width="100%"
        bgColor="blue.500"
        borderRadius="xl"
        color="white"
        _hover={{ bgColor: "blue.700" }}
      >
        Seguir
        {/* TODO: FOLLOW */}
      </Button>
    </Flex>
  );
}

export default AuthorCard;
