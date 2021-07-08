import {
  Box,
  Button,
  Flex,
  Heading,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import kitchen from "../assets/kitchen.png";
import { Formik, Form } from "formik";
import InputField from "../components/InputField";
import * as Yup from "yup";
import { useForgotPasswordMutation } from "../generated/graphql";

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email("Debe ingresar un correo electrónico válido")
    .required("Debe ingresar un correo electrónico"),
});

function ForgotPassword() {
  const [forgotPassword] = useForgotPasswordMutation();
  const toast = useToast();
  const [isMobile] = useMediaQuery("(min-width: 786px)");

  return (
    <Flex justify="center" align="center" bgColor="gray.100" height="100%">
      <Box
        flexGrow={1}
        p="5"
        bgColor="white"
        maxHeight="600px"
        height="100%"
        maxWidth="500px"
        width="100%"
        borderTopLeftRadius="xl"
        borderBottomLeftRadius="xl"
        borderBottomRightRadius={isMobile ? "none" : "xl"}
        borderTopRightRadius={isMobile ? "none" : "xl"}
        display="flex"
        justifyContent="center"
        flexDir="column"
      >
        <Heading mx="auto" mb="10" fontSize={isMobile ? "3xl" : "2xl"}>
          Reestablecer contraseña
        </Heading>
        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            try {
              const resp = await forgotPassword({ variables: values });

              if (resp.data?.forgotPassword) {
                return toast({
                  title: "Éxito",
                  description:
                    "Enviaremos un correo electrónico para que puedas reestablecer la contraseña",
                  status: "success",
                  isClosable: true,
                  position: "top",
                });
              }

              return toast({
                title: "Error",
                description:
                  "No existe un usuario asociado al correo electrónico proporcionado",
                status: "error",
                isClosable: true,
                position: "top",
              });
            } catch (err) {
              return toast({
                title: "Error",
                description: err.message,
                status: "error",
                isClosable: true,
                position: "top",
              });
            }
          }}
          validationSchema={RegisterSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="email"
                placeholder="Correo electrónico"
                label="Correo electrónico"
              />
              <Flex align="center" justify="space-evenly" my="5">
                <Button
                  isLoading={isSubmitting}
                  type="submit"
                  borderRadius="3xl"
                  px="10"
                  bgColor="#f7cf1c"
                  color="black"
                  _hover={{ bgColor: "gray.400" }}
                >
                  Reestablecer Contraseña
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
      <Box
        display={isMobile ? "block" : "none"}
        bgImage={kitchen}
        bgSize="cover"
        bgPosition="center"
        maxWidth="400px"
        width="100%"
        maxHeight="600px"
        height="100%"
        borderTopRightRadius="xl"
        borderBottomRightRadius="xl"
        zIndex="0"
      />
    </Flex>
  );
}

export default ForgotPassword;
