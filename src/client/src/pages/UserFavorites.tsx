import { Flex, Heading, Input, Grid, useMediaQuery } from "@chakra-ui/react";
import NoResults from "../components/NoResults";
import RecipeCard from "../components/RecipeCard";
import { useContext, useState } from "react";
import { useUserFavoritesQuery } from "../generated/graphql";
import SpinnerComponent from "../components/Spinner";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { AuthContext } from "../App";

interface Params {
  username: string;
}

function UserFavorites() {
  const { username } = useParams<Params>();
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [isMobile] = useMediaQuery("(max-width: 786px)");
  const { data, loading, error } = useUserFavoritesQuery({
    fetchPolicy: "network-only",
    variables: { username },
  });
  const [search, setSearch] = useState("");

  if (user === username) {
    return <Redirect to="/favorites" />;
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
      <Heading>Recetas favoritas de {username}</Heading>
      {data?.getUser.likedPosts.length === 0 ? (
        <Flex
          justify="center"
          align="center"
          maxWidth="650px"
          marginTop="35"
          width="100%"
          bgColor="white"
        >
          <NoResults
            buttonLink={history.location.pathname.replace("/favorites", "")}
            buttonText="Volver"
            heading={`${username} aún no tiene recetas favoritas`}
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
            {data?.getUser.likedPosts
              .filter(({ post: r }) =>
                r.title.toLowerCase().includes(search.toLocaleLowerCase())
              )
              .map(({ post: r }) => (
                <RecipeCard
                  duration={r.time}
                  img={r.picture}
                  slug={r.slug}
                  title={r.title}
                  width={
                    isMobile
                      ? "100%"
                      : data.getUser.likedPosts.length < 2
                      ? "50%"
                      : "100%"
                  }
                  // width={}
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

export default UserFavorites;
