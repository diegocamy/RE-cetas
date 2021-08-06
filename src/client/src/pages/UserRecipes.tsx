import { Flex, Grid, Heading, Input } from "@chakra-ui/react";
import { useContext, useState } from "react";
import NoResults from "../components/NoResults";
import RecipeCard from "../components/RecipeCard";
import SpinnerComponent from "../components/Spinner";
import { useGetUserPostsQuery } from "../generated/graphql";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { AuthContext } from "../App";

interface Params {
  username: string;
}

function UserRecipes() {
  const { user } = useContext(AuthContext);
  const { username } = useParams<Params>();
  const history = useHistory();
  const { data, loading, error } = useGetUserPostsQuery({
    fetchPolicy: "network-only",
    variables: { username },
  });
  const [search, setSearch] = useState("");

  if (user === username) {
    return <Redirect to="/recipes" />;
  }

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
      <Heading>Recetas de {username}</Heading>
      {data?.getUser.posts.length === 0 ? (
        <Flex
          justify="center"
          align="center"
          maxWidth="650px"
          marginTop="35"
          width="100%"
          bgColor="white"
        >
          <NoResults
            buttonLink={history.location.pathname.replace("/recipes", "")}
            buttonText="Volver"
            heading={`${username} aún no tiene recetas`}
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
            {data?.getUser.posts
              .filter((r) =>
                r.title.toLowerCase().includes(search.toLocaleLowerCase())
              )
              .map((r) => (
                <RecipeCard
                  duration={r.time}
                  img={r.picture}
                  slug={r.slug}
                  title={r.title}
                  width={data.getUser.posts.length < 2 ? "50%" : "100%"}
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

export default UserRecipes;
