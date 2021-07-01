import { useContext } from "react";
import { AuthContext } from "../App";
import {
  Box,
  Image,
  Container,
  Heading,
  Text,
  Flex,
  useMediaQuery,
} from "@chakra-ui/react";
import dish from "../assets/dish.png";

function Home() {
  const { user } = useContext(AuthContext);
  const [isMobile] = useMediaQuery("(max-width: 840px)");

  return (
    <>
      <Box
        bgColor="#f7cf1c"
        color="black"
        height="450px"
        width="100%"
        position="absolute"
        top="0"
        left="0"
        zIndex="-1"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Container
          position="relative"
          height="300px"
          maxWidth="container.lg"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Flex direction="column" width="600px">
            <Heading size={isMobile ? "xl" : "3xl"} mb="2">
              Todas tus recetas en un solo lugar!
            </Heading>
            <Text fontSize={isMobile ? "lg" : "2xl"}>
              Guardá, compartí y descubrí los platos mas deliciosos!
            </Text>
          </Flex>
          <Image
            src={dish}
            display="inline"
            width={isMobile ? "300px" : "400px"}
            height={isMobile ? "300px" : "400px"}
          />
        </Container>
      </Box>
    </>
  );
}

export default Home;
