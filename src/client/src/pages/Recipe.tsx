import { useGetPostQuery } from "../generated/graphql";
import { Redirect, useParams } from "react-router-dom";
import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import draftToHTML from "draftjs-to-html";
import PreviewPost from "../components/PreviewPost";
import AuthorCard from "../components/AuthorCard";

interface Params {
  slug: string;
}

function Recipe() {
  const { slug } = useParams<Params>();
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
      </Box>
    </Flex>
  );
}

export default Recipe;
