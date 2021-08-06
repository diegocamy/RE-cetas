import { Flex, Spinner } from "@chakra-ui/react";

interface Props {
  height?: string;
}

function SpinnerComponent({ height }: Props) {
  return (
    <Flex justify="center" align="center" height={height ? height : "auto"}>
      <Spinner size="xl" emptyColor="gray.200" color="amarillo" />
    </Flex>
  );
}

export default SpinnerComponent;
