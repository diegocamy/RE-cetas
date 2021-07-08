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
import { useHistory, useParams } from "react-router-dom";
import { useChangePasswordMutation } from "../generated/graphql";
import { getFormValidationErrors } from "../utils/validationErrors";
import { setAccessToken } from "../auth/jwt";
import { useContext } from "react";
import { AuthContext } from "../App";

const RegisterSchema = Yup.object().shape({
  password: Yup.string()
    .required("Debe ingresar una contraseña")
    .min(5, "La contraseña debe tener mínimo 5 caracteres"),
  repeat_password: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Las contraseñas deben coincidir"
  ),
});

interface Params {
  token: string;
}

function ResetPassword() {
  const { setUser } = useContext(AuthContext);
  const history = useHistory();
  const params = useParams<Params>();
  const toast = useToast();
  const [changePassword] = useChangePasswordMutation();
  const [isMobile] = useMediaQuery("(min-width: 786px)");

  // return <p>{JSON.stringify(params, null, 2)}</p>;

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
          Cambiar Contraseña
        </Heading>
        <Formik
          initialValues={{
            password: "",
            repeat_password: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            try {
              const response = await changePassword({
                variables: {
                  password: values.password,
                  token: params.token,
                },
              });

              if (!response.data?.changePassword) {
                return toast({
                  title: "Error",
                  description: "Ha ocurrido un error al cambiar la contraseña",
                  status: "error",
                  isClosable: true,
                  position: "top",
                });
              }

              const jwt = response.data.changePassword.jwt;
              const username = response.data.changePassword.user.username;

              setAccessToken(jwt);
              setUser(username);

              history.push("/home");
            } catch (err) {
              const validationErrors = getFormValidationErrors(err);

              //check if validation errors object is not empty
              if (Object.keys(validationErrors).length > 0) {
                return setErrors(validationErrors);
              }

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
                name="password"
                placeholder="Nueva contraseña"
                label="Nueva contraseña"
                showPasswordButton
              />
              <InputField
                name="repeat_password"
                placeholder="Repetir contraseña"
                label="Repetir contraseña"
                showPasswordButton
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
                  Cambiar Contraseña
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

export default ResetPassword;
