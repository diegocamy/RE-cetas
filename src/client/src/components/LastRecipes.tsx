import { Box, Heading, Flex, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { RiAddFill } from "react-icons/ri";
import RecipeCard from "./RecipeCard";

interface Receta {
  slug: string;
  picture: string;
  title: string;
  time: string;
}

interface Props {
  recetas: Receta[];
  isMobile: boolean;
}

function LastRecipes({ recetas, isMobile }: Props) {
  if (recetas.length === 0) {
    return (
      <Flex
        direction="column"
        bg="white"
        borderRadius="xl"
        p="2"
        w="100%"
        justify="center"
        align="center"
        minHeight="200px"
      >
        <Heading size="md" mb="3">
          Aún no tienes recetas.
        </Heading>
        <Button
          as={Link}
          to="/new"
          rightIcon={<RiAddFill />}
          bgColor="amarillo"
          color="black"
          _hover={{ bgColor: "yellow.400" }}
        >
          Crear receta
        </Button>
      </Flex>
    );
  }

  return (
    <Box bg="white" borderRadius="xl" p="2" w="100%">
      <Heading size="md" mb="2">
        Tus últimas recetas
      </Heading>

      <Flex
        flexWrap="nowrap"
        overflowX="auto"
        css={
          isMobile
            ? {
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }
            : {
                "&::-webkit-scrollbar": {
                  height: "10px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "#e4e4e4",
                  borderRadius: "100px",
                  height: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#979797",
                  borderRadius: "100px",
                },
              }
        }
      >
        {recetas.map((r) => (
          <Box key={r.slug} flex="0 0 auto">
            <RecipeCard
              img={r.picture}
              title={r.title}
              duration={r.time}
              slug={r.slug}
              width={isMobile ? "270px" : "320px"}
              marginRight
              borderRadius
            />
          </Box>
        ))}
      </Flex>
    </Box>
  );
}

export default LastRecipes;
