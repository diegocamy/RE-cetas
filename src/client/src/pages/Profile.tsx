import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { BiFoodMenu } from "react-icons/bi";
import { useMeLazyQuery } from "../generated/graphql";

function Profile() {
  const [executeQuery, { data }] = useMeLazyQuery();

  useEffect(() => {
    let _isMounted = true;

    if (_isMounted) {
      executeQuery();
    }

    return () => {
      _isMounted = false;
    };
  }, [executeQuery]);

  return (
    <Flex minHeight="100%">
      <Box
        bgColor="amarillo"
        textAlign="left"
        maxWidth="250px"
        width="100%"
        pl="5"
      >
        <Button
          as={Text}
          leftIcon={<BiFoodMenu />}
          bg="transparent"
          fontWeight="normal"
          _hover={{ bgColor: "transparent", cursor: "pointer" }}
          _active={{ bgColor: "transparent", fontWeight: "bold" }}
          borderRadius="none"
          my="1"
        >
          Mis recetas
        </Button>
        <Button
          as={Text}
          leftIcon={<FaHeart />}
          bg="transparent"
          fontWeight="normal"
          _hover={{ bgColor: "transparent", cursor: "pointer" }}
          _active={{ bgColor: "transparent", fontWeight: "bold" }}
          borderRadius="none"
          my="1"
        >
          Recetas favoritas
        </Button>
      </Box>
      <Box></Box>
    </Flex>
  );
}

export default Profile;
