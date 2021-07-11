import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import { useEffect } from "react";
import Container from "../components/Container";
import StatsBox from "../components/StatsBox";
import UserInfoCard from "../components/UserInfoCard";
import { useMeLazyQuery } from "../generated/graphql";

function Profile() {
  const [executeQuery, { data, loading }] = useMeLazyQuery();
  const [isMobile] = useMediaQuery("(max-width: 1070px)");

  useEffect(() => {
    let _isMounted = true;

    if (_isMounted) {
      executeQuery();
    }

    return () => {
      _isMounted = false;
    };
  }, [executeQuery]);

  if (loading) return <p>Loading</p>;

  return (
    <Box bgColor="gray.100">
      <Container>
        <Flex direction={isMobile ? "column" : "row"} mx="auto" py="2">
          <Box w={isMobile ? "100%" : "70%"}>
            <UserInfoCard
              user={data?.me.username!}
              bio={data?.me.bio || ""}
              avatar={data?.me.avatar || ""}
            />
          </Box>
          <Box w={isMobile ? "100%" : "30%"} px="2">
            <StatsBox
              recipes={data?.me.posts.length || 0}
              favourites={data?.me.likedPosts.length || 0}
              followers={3}
              following={13}
            />
          </Box>
          <Box></Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default Profile;
