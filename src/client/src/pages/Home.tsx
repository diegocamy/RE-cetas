import {
  Box,
  Image,
  Heading,
  Text,
  Flex,
  useMediaQuery,
} from "@chakra-ui/react";
import dish from "../assets/dish.png";

function Home() {
  const [isMobile] = useMediaQuery("(max-width:786px)");

  return (
    <Box
      bgColor="#f7cf1c"
      color="black"
      height="450px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        direction={isMobile ? "column" : "row"}
        align="center"
        justify="center"
      >
        <Box m="1" p="2">
          <Heading fontSize={isMobile ? "2xl" : "4xl"}>
            Todas tus recetas en un solo lugar
          </Heading>
          <Text fontSize={isMobile ? "lg" : "2xl"}>
            El mejor lugar para crear, compartir y descubrir recetas!
          </Text>
        </Box>
        <Image src={dish} w="280px" m="auto" />
      </Flex>
    </Box>
  );
}

export default Home;
