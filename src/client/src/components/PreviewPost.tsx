import { Image, Box, Heading } from "@chakra-ui/react";

interface Props {
  image: string;
  title: string;
  markup: string;
}

function PreviewPost({ markup, image, title }: Props) {
  return (
    <>
      {image && (
        <Image
          width="100%"
          height="400px"
          objectFit="cover"
          src={image}
          m="auto"
        />
      )}
      <Box w="100%" overflowY="auto" bgColor="white" p="3" textAlign="left">
        <Heading my="7">{title}</Heading>
        <Box dangerouslySetInnerHTML={{ __html: markup }} className="post" />
      </Box>
    </>
  );
}

export default PreviewPost;
