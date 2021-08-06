import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import { Redirect, useParams } from "react-router-dom";
import { useEffect } from "react";
import Container from "../components/Container";
import LastRecipes from "../components/LastRecipes";
import UserInfoCard from "../components/UserInfoCard";
import { useGetUserLazyQuery } from "../generated/graphql";
import StatsBox from "../components/StatsBox";
import SpinnerComponent from "../components/Spinner";

interface Params {
  username: string;
}

function UserProfile() {
  const { username } = useParams<Params>();
  const [executeQuery, { data, loading, error }] = useGetUserLazyQuery({
    fetchPolicy: "network-only",
  });
  const [isMobile] = useMediaQuery("(max-width: 1070px)");

  useEffect(() => {
    let _isMounted = true;

    if (_isMounted) {
      executeQuery({
        variables: { username },
      });
    }

    return () => {
      _isMounted = false;
    };
  }, [executeQuery, username]);

  if (loading && !data) return <SpinnerComponent height="100%" />;

  if (error) {
    return <Redirect to="/404" />;
  }

  return (
    <Box bgColor="gray.100" minHeight="100%">
      <Container>
        <Flex direction={isMobile ? "column" : "row"} mx="auto" py="2">
          <Box w={isMobile ? "100%" : "70%"}>
            <UserInfoCard
              user={data?.getUser!.username!}
              bio={data?.getUser!.bio || ""}
              avatar={data?.getUser!.avatar || ""}
              joined={data?.getUser!.created}
            />
          </Box>
          <Box w={isMobile ? "100%" : "30%"} px="2">
            <StatsBox
              recipes={data?.getUser!.postCount!}
              favourites={data?.getUser!.likedPosts.length! || 0}
              followers={data?.getUser!.followersCount!}
              following={data?.getUser!.followingCount!}
              linkRecetas={`/user/${username}/recipes`}
              linkFavoritos={`/user/${username}/favorites`}
              linkFollowers={`/user/${username}/followers`}
              linkFollowing={`/user/${username}/following`}
            />
          </Box>
        </Flex>
        <Box
          pl="2"
          w={isMobile ? "100%" : "70%"}
          pr={isMobile ? "2" : "none"}
          pb="2"
        >
          {data?.getUser?.last4posts!.length! > 0 && (
            <LastRecipes
              message={`Últimas recetas de ${username}`}
              recetas={data?.getUser!.last4posts || []}
              isMobile={isMobile}
            />
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default UserProfile;
