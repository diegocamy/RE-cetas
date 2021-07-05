import {
  Box,
  Image,
  Heading,
  Text,
  Flex,
  useMediaQuery,
  Grid,
} from "@chakra-ui/react";
import dish from "../assets/dish.png";
import RecipeCard from "../components/RecipeCard";
import data from "../data/cardsData";

function Home() {
  const [isMobile] = useMediaQuery("(max-width:786px)");
  const [widerThan990px, widerThan630px] = useMediaQuery([
    "(min-width: 990px)",
    "(min-width: 650px)",
  ]);

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
        {/* RECIPE CARDS */}
      </Box>
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
    </>
  );
}

export default Home;
