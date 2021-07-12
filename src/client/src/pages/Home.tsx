import {
  Box,
  Image,
  Heading,
  Text,
  Flex,
  useMediaQuery,
  Grid,
  Button,
} from "@chakra-ui/react";
import { Link, Redirect } from "react-router-dom";
import dish from "../assets/dish.png";
import background from "../assets/background.jpg";
import RecipeCard from "../components/RecipeCard";
import data from "../data/cardsData";
import { useContext } from "react";
import { AuthContext } from "../App";

function Home() {
  const { user } = useContext(AuthContext);
  const [isMobile] = useMediaQuery("(max-width:786px)");
  const [widerThan990px, widerThan630px] = useMediaQuery([
    "(min-width: 990px)",
    "(min-width: 650px)",
  ]);

  if (user) {
    return <Redirect to="/home" />;
  }

  return (
    <>
      <Box
        bgColor="#f7cf1c"
        color="black"
        height="450px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {/* HERO SECTION */}
        <Flex
          direction={isMobile ? "column" : "row"}
          align="center"
          justify="center"
          p="5"
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
      {/* RECIPE CARDS */}
      <Flex direction="column" align="center" py="12" bgColor="gray.100">
        <Grid
          templateColumns={
            widerThan990px
              ? "repeat(3,1fr)"
              : widerThan630px
              ? "repeat(2,1fr)"
              : "repeat(1,1fr)"
          }
          gap={3}
        >
          {data.map((receta) => (
            <RecipeCard
              key={receta.title}
              title={receta.title}
              img={receta.img}
              duration={receta.duration}
            />
          ))}
        </Grid>
      </Flex>
      <Box
        background="black"
        color="white"
        py="20"
        position="relative"
        zIndex="0"
      >
        <Box
          bgImage={background}
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
          filter="brightness(0.3)"
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          zIndex="-1"
        />
        <Flex
          direction="column"
          align="center"
          m="auto"
          zIndex="1"
          textAlign="center"
        >
          <Heading>Qué esperas para formar parte de nuestra comunidad?</Heading>
          <Button
            size="lg"
            borderRadius="3xl"
            px="10"
            py="5"
            bgColor="red.500"
            _hover={{ bgColor: "red.800" }}
            m="5"
            as={Link}
            to="/register"
          >
            Registrarse
          </Button>
        </Flex>
      </Box>
    </>
  );
}

export default Home;
