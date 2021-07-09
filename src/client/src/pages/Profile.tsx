import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import { useEffect } from "react";
import Container from "../components/Container";
import UserInfoCard from "../components/UserInfoCard";
import { useMeLazyQuery } from "../generated/graphql";

function Profile() {
  const [executeQuery, { data }] = useMeLazyQuery();
  const [isMobile] = useMediaQuery("(max-width: 786px)");

  useEffect(() => {
    let _isMounted = true;

    if (_isMounted) {
      executeQuery();
    }

    return () => {
      _isMounted = false;
    };
  }, [executeQuery]);

  return (
    <Box bgColor="gray.100">
      <Container>
        <Flex w={isMobile ? "100%" : "70%"} mx="auto" py="2">
          <UserInfoCard user={data?.me.username!} bio="asd" />
        </Flex>
      </Container>
    </Box>
  );
}

export default Profile;
