import { Box } from "@chakra-ui/react";

interface Props {
  children?: JSX.Element[] | JSX.Element;
}

function Container(props: Props) {
  return (
    <Box m="auto" maxWidth="1300px" w="100%">
      {props.children}
    </Box>
  );
}

export default Container;
