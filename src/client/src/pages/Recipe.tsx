import { useGetPostQuery } from "../generated/graphql";
import { useParams } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import draftToHTML from "draftjs-to-html";
import PreviewPost from "../components/PreviewPost";

interface Params {
  slug: string;
}

function Recipe() {
  const { slug } = useParams<Params>();
  const { data, loading } = useGetPostQuery({
    fetchPolicy: "network-only",
    variables: { slug },
  });
  if (loading) {
    return null;
  }

  if (!data || !data.getPost) {
    return <div>Recipe not found</div>;
  }

  console.log(data);
  return (
    <Flex justify="center" bgColor="gray.100" py="8">
      <PreviewPost
        image={data.getPost.picture}
        markup={draftToHTML(JSON.parse(data.getPost.content))}
        title={data.getPost.title}
        time={data.getPost.time}
      />
    </Flex>
  );
}

export default Recipe;
