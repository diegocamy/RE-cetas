import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import bg from "../assets/background.jpg";

interface Props {
  user: string;
  bio?: string;
}

function UserInfoCard({ user, bio }: Props) {
  const [isMobile] = useMediaQuery("(max-width: 786px)");
  return (
    <Flex direction="column" height="350px" borderRadius="2xl">
      <Box
        height="50%"
        width="100%"
        bgImage={bg}
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        filter="brightness(0.6)"
        borderTopRadius="inherit"
      />
      <Flex
        height="50%"
        borderBottomRadius="inherit"
        bgColor="white"
        px={isMobile ? 2 : 5}
        direction={isMobile ? "column" : "row"}
      >
        {isMobile ? (
          <Image
            src={bg}
            width="150px"
            height="150px"
            borderRadius="50%"
            left="0"
            right="0"
            mx="auto"
            top="70"
            position="absolute"
            zIndex="1"
            border="5px solid white"
          />
        ) : (
          <Image
            src={bg}
            width="150px"
            height="150px"
            borderRadius="50%"
            top="-50%"
            position="relative"
            border="5px solid white"
          />
        )}
        <Flex p={isMobile ? 1 : 2} width="100%" direction="column">
          <Flex
            alignItems="center"
            height="fit-content"
            justify="space-between"
          >
            <Heading size="lg">{user}</Heading>
            <Button leftIcon={<FiEdit color="black" />} bg="amarillo" size="sm">
              Editar Perfil
            </Button>
          </Flex>
          <Text lineHeight="1" mt="4">
            {bio}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default UserInfoCard;
