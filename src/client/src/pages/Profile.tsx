import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import { useEffect } from "react";
import Container from "../components/Container";
import LastRecipes from "../components/LastRecipes";
import StatsBox from "../components/StatsBox";
import UserInfoCard from "../components/UserInfoCard";
import { useMeLazyQuery } from "../generated/graphql";

function Profile() {
  const [executeQuery, { data, loading }] = useMeLazyQuery({
    fetchPolicy: "network-only",
  });
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

  if (loading) return null;

  return (
    <Box bgColor="gray.100" minHeight="100%">
      <Container>
        <Flex direction={isMobile ? "column" : "row"} mx="auto" py="2">
          <Box w={isMobile ? "100%" : "70%"}>
            <UserInfoCard
              user={data?.me.username!}
              bio={data?.me.bio || ""}
              avatar={data?.me.avatar || ""}
              joined={data?.me.created}
            />
          </Box>
          <Box w={isMobile ? "100%" : "30%"} px="2">
            <StatsBox
              createButton
              recipes={data?.me.postCount!}
              favourites={data?.me.likedPosts.length || 0}
              followers={data?.me.followersCount!}
              following={data?.me.followingCount!}
            />
          </Box>
        </Flex>
        <Box
          pl="2"
          w={isMobile ? "100%" : "70%"}
          pr={isMobile ? "2" : "none"}
          pb="2"
        >
          <LastRecipes
            recetas={data?.me.last4posts || []}
            isMobile={isMobile}
          />
        </Box>
      </Container>
    </Box>
  );
}

export default Profile;
