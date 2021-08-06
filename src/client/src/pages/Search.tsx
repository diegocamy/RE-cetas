import {
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  Text,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import svg from "../assets/search.svg";
import { useEffect, useState } from "react";
import { useGetPostByTitleLazyQuery } from "../generated/graphql";
import RecipeCard from "../components/RecipeCard";
import SpinnerComponent from "../components/Spinner";

function Search() {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const toast = useToast();
  const [search, setSearch] = useState("");
  const [getPosts, { data, loading, error }] = useGetPostByTitleLazyQuery();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search) {
        getPosts({ variables: { title: search } });
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, getPosts]);

  if (error) {
    toast({
      description: error.message,
      title: "Error",
      position: "top",
      status: "error",
      isClosable: true,
    });
  }

  return (
    <Flex direction="column" align="center" minHeight="100%" p="5">
      <Heading>Buscar recetas</Heading>
      <Text>Descubre recetas increíbles</Text>
      <Input
        placeholder="Ej: Milanesas de carne"
        maxWidth="500px"
        w="100%"
        bg="white"
        my="3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {!search && <Image src={svg} maxW="400px" w="100%" my="5" />}
      {loading && !data && <SpinnerComponent height="200px" />}
      {!loading && data && search ? (
        <Grid
          maxWidth="910px"
          width="100%"
          gridTemplateColumns="repeat( auto-fit, minmax(270px, 1fr) )"
          gridGap="2"
          placeItems="center"
        >
          {data?.posts.map((r) => (
            <RecipeCard
              duration={r.time}
              img={r.picture}
              slug={r.slug}
              title={r.title}
              width={isMobile ? "100%" : data.posts.length < 2 ? "50%" : "100%"}
              marginRight
              key={r.slug}
            />
          ))}
        </Grid>
      ) : null}
      {!loading && data?.posts.length === 0 && search && (
        <Flex align="center" justify="center" height="300px">
          <Text>No hay resultados.</Text>
        </Flex>
      )}
    </Flex>
  );
}

export default Search;
