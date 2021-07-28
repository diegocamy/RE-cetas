import { useDeletePostMutation, useGetPostQuery } from "../generated/graphql";
import { Redirect, useParams, useHistory, Link } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  useDisclosure,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import draftToHTML from "draftjs-to-html";
import PreviewPost from "../components/PreviewPost";
import AuthorCard from "../components/AuthorCard";
import { useContext } from "react";
import { AuthContext } from "../App";
import AlertDelete from "../components/AlertDelete";
import RecipeCard from "../components/RecipeCard";

interface Params {
  slug: string;
}

function Recipe() {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const toast = useToast();
  const { slug } = useParams<Params>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deletePost, { loading: loadingDelete }] = useDeletePostMutation();
  const { data, loading } = useGetPostQuery({
    fetchPolicy: "network-only",
    variables: { slug },
  });
  const [isMobile] = useMediaQuery("(max-width: 1200px)");

  if (loading) {
    return null;
  }

  if (!data || !data.getPost) {
    return <Redirect to="/404" />;
  }

  const deleteRecipe = async () => {
    try {
      onClose();
      const { data } = await deletePost({ variables: { slug } });
      if (data?.DeletePost) {
        history.push("/home");
      }
    } catch (error) {
      toast({
        status: "error",
        description: error.message,
        isClosable: true,
        position: "top",
        title: "Error",
      });
    }
  };

  return (
    <Flex justify="center" bgColor="gray.100" py="8" flexWrap="wrap">
      <Box maxWidth="750px" width="100%">
        <PreviewPost
          image={data.getPost.picture}
          markup={draftToHTML(JSON.parse(data.getPost.content))}
          title={data.getPost.title}
          time={data.getPost.time}
        />
      </Box>
      <Box
        width={isMobile ? "750px" : "350px"}
        mx={isMobile ? "none" : 3}
        my={isMobile ? 3 : "none"}
      >
        <AuthorCard
          avatar={data.getPost.author.avatar}
          username={data.getPost.author.username}
          followers={data.getPost.author.followers}
        />
        {data.getPost.author.username === user && (
          <>
            <AlertDelete
              body="Está seguro/a de eliminar esta receta? Se perderá todo su contenido"
              header="Eliminar"
              isOpen={isOpen}
              onClose={onClose}
              deleteAction={deleteRecipe}
              onOpen={onOpen}
            />
            <Button
              w="100%"
              bgColor="blue.500"
              color="white"
              mt="2"
              _hover={{ bgColor: "blue.700" }}
              as={Link}
              to={`/edit/${slug}`}
            >
              Editar receta
            </Button>
            <Button
              w="100%"
              bgColor="red.500"
              color="white"
              mt="2"
              _hover={{ bgColor: "red.700" }}
              onClick={onOpen}
              isLoading={loadingDelete}
            >
              Eliminar receta
            </Button>
          </>
        )}
        {!isMobile && (
          <Flex
            flexDirection="column"
            align="center"
            my="2"
            flexWrap="nowrap"
            overflowX="auto"
          >
            {data.getPost.author.last4posts.map((r) => (
              <RecipeCard
                key={r.slug}
                img={r.picture}
                title={r.title}
                duration={r.time}
                slug={r.slug}
                width="350px"
                marginY
              />
            ))}
          </Flex>
        )}
      </Box>
      {isMobile && (
        <Flex
          my="2"
          flexWrap="nowrap"
          overflowX="auto"
          css={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {data.getPost.author.last4posts.map((r) => (
            <Box key={r.slug} flex="0 0 auto">
              <RecipeCard
                img={r.picture}
                title={r.title}
                duration={r.time}
                slug={r.slug}
                width="300px"
                marginRight
              />
            </Box>
          ))}
        </Flex>
      )}
    </Flex>
  );
}

export default Recipe;
