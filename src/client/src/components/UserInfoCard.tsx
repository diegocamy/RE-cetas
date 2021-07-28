import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Text,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { RiCake2Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import bg from "../assets/background.jpg";
import EditProfileModal from "./EditProfileModal";
import { formatDistance } from "date-fns";
import { es } from "date-fns/locale";

interface Props {
  user: string;
  bio: string;
  avatar: string;
  joined: string;
}

function UserInfoCard({ user, bio, avatar, joined }: Props) {
  const [isMobile] = useMediaQuery("(max-width: 1070px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      direction="column"
      borderRadius="2xl"
      w="100%"
      p={isMobile ? "2" : "none"}
      pl="2"
    >
      <Box
        height={isMobile ? "110px" : "150px"}
        width="100%"
        bgImage={bg}
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        filter="brightness(0.6)"
        borderTopRadius="inherit"
      />
      <Flex
        height={isMobile ? "fit-content" : "150px"}
        borderBottomRadius="inherit"
        bgColor="white"
        px={isMobile ? 2 : 5}
        direction={isMobile ? "column" : "row"}
      >
        {isMobile ? (
          <Image
            src={avatar || bg}
            width="100px"
            height="100px"
            borderRadius="50%"
            left="0"
            right="0"
            mx="auto"
            top="71"
            position="absolute"
            zIndex="0"
            border="5px solid white"
          />
        ) : (
          <Image
            src={avatar || bg}
            width="150px"
            height="150px"
            borderRadius="50%"
            top="-50%"
            position="relative"
            border="5px solid white"
          />
        )}
        <Flex
          p={isMobile ? 1 : 2}
          width="100%"
          height="100%"
          direction="column"
        >
          <Flex
            alignItems="center"
            height="fit-content"
            justify="space-between"
          >
            <Heading size="lg">{user}</Heading>
            <Button
              leftIcon={<FiEdit color="black" />}
              bg="amarillo"
              size="sm"
              onClick={onOpen}
            >
              Editar Perfil
            </Button>
            <EditProfileModal
              isOpen={isOpen}
              onClose={onClose}
              bio={bio}
              avatar={avatar}
            />
          </Flex>
          <Text lineHeight="1" mt="4" mb="4">
            {bio}
          </Text>
          <Flex align="center" mb="0" mt="auto">
            <Icon as={RiCake2Line} w={7} h={7} color="gray.600" mr="2" />
            <Text>
              Se unió hace{" "}
              {joined &&
                formatDistance(new Date(joined), new Date(), {
                  locale: es,
                })}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default UserInfoCard;
