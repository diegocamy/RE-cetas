import { Flex, Grid, Heading } from "@chakra-ui/react";
import NoResults from "../components/NoResults";
import RecipeCard from "../components/RecipeCard";
import { useMeRecipesQuery } from "../generated/graphql";

function Recipes() {
  const { data, loading, error } = useMeRecipesQuery({
    fetchPolicy: "network-only",
  });

  if (loading && !data) {
    return <p>loading</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <Flex
      bg="gray.100"
      align="center"
      py="5"
      minHeight="100%"
      direction="column"
    >
      <Heading>Tus Recetas</Heading>
      {data?.me.posts.length === 0 ? (
        <Flex
          justify="center"
          align="center"
          maxWidth="650px"
          marginTop="35"
          width="100%"
          bgColor="white"
        >
          <NoResults
            buttonLink="/new"
            buttonText="Crea tu primer receta!"
            heading="Aún no tienes recetas"
          />
        </Flex>
      ) : (
        <Grid
          bgColor="white"
          maxWidth="910px"
          width="100%"
          p="2"
          gridTemplateColumns="repeat( auto-fit, minmax(270px, 1fr) )"
          gridGap="2"
          placeItems="center"
        >
          {data?.me.posts.map((r) => (
            <RecipeCard
              duration={r.time}
              img={r.picture}
              slug={r.slug}
              title={r.title}
              width={data.me.posts.length < 2 ? "50%" : "100%"}
              marginRight
              key={r.slug}
            />
          ))}
        </Grid>
      )}
    </Flex>
  );
}

export default Recipes;
