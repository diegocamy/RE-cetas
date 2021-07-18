import { Image, Box, Heading, Text } from "@chakra-ui/react";

interface Props {
  image: string;
  title: string;
  markup: string;
  time: string;
}

function PreviewPost({ markup, image, title, time }: Props) {
  return (
    <Box>
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
        <Heading mt="7">{title}</Heading>
        <Text mb="7">Tiempo de preparación: {time} min.</Text>
        <Box dangerouslySetInnerHTML={{ __html: markup }} className="post" />
      </Box>
    </Box>
  );
}

export default PreviewPost;
