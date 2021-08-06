import { Flex, Heading, Input, Grid } from "@chakra-ui/react";
import NoResults from "../components/NoResults";
import RecipeCard from "../components/RecipeCard";
import { useState } from "react";
import { useMeFavoritesQuery } from "../generated/graphql";
import SpinnerComponent from "../components/Spinner";

function Favorites() {
  const { data, loading, error } = useMeFavoritesQuery({
    fetchPolicy: "network-only",
  });
  const [search, setSearch] = useState("");

  if (loading && !data) {
    return <SpinnerComponent height="100%" />;
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
      {data?.me.likedPosts.length === 0 ? (
        <Flex
          justify="center"
          align="center"
          maxWidth="650px"
          marginTop="35"
          width="100%"
          bgColor="white"
        >
          <NoResults
            buttonLink="/home"
            buttonText="Volver"
            heading="Aún no tienes recetas favoritas guardadas"
          />
        </Flex>
      ) : (
        <>
          <Input
            placeholder="Buscar receta..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            bgColor="white"
            maxWidth="600px"
            w="100%"
            my="5"
          />
          <Grid
            maxWidth="910px"
            width="100%"
            gridTemplateColumns="repeat( auto-fit, minmax(270px, 1fr) )"
            gridGap="2"
            placeItems="center"
          >
            {data?.me.likedPosts
              .filter(({ post: r }) =>
                r.title.toLowerCase().includes(search.toLocaleLowerCase())
              )
              .map(({ post: r }) => (
                <RecipeCard
                  duration={r.time}
                  img={r.picture}
                  slug={r.slug}
                  title={r.title}
                  width={data.me.likedPosts.length < 2 ? "50%" : "100%"}
                  marginRight
                  key={r.slug}
                />
              ))}
          </Grid>
        </>
      )}
    </Flex>
  );
}

export default Favorites;
