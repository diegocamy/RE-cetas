import { useContext, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  useMediaQuery,
  Link,
  useToast,
} from "@chakra-ui/react";
import kitchen from "../assets/kitchen.png";
import { Formik, Form } from "formik";
import InputField from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import * as Yup from "yup";
import { Link as RouterLink, Redirect } from "react-router-dom";
import { setAccessToken } from "../auth/jwt";
import { AuthContext } from "../App";
import { getFormValidationErrors } from "../utils/validationErrors";

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email("Debe ingresar un correo electrónico válido")
    .required("Debe ingresar un correo electrónico"),
  password: Yup.string().required("Debe ingresar una contraseña"),
});

function Login() {
  const toast = useToast();
  const { setUser, user } = useContext(AuthContext);
  const [isMobile] = useMediaQuery("(min-width: 786px)");
  const [login] = useLoginMutation();

  if (user) {
    return <Redirect to="/home" />;
  }

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
        <Heading mx="auto" mb="10">
          Iniciar Sesión
        </Heading>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            try {
              const response = await login({
                variables: values,
              });

              //set jwt
              setAccessToken(response.data?.login.jwt!);

              //set user
              setUser(response.data?.login.user.username!);
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
                name="email"
                placeholder="Correo electrónico"
                label="Correo electrónico"
              />
              <InputField
                name="password"
                type="password"
                placeholder="Contraseña"
                label="Contraseña"
                showPasswordButton
              />
              <Flex justify="flex-end">
                <Link
                  textAlign="right"
                  as={RouterLink}
                  to="/forgot-password"
                  fontWeight="bold"
                >
                  Olvidé mi contraseña
                </Link>
              </Flex>
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
                  Ingresar
                </Button>
                <Button
                  disabled={isSubmitting}
                  as={RouterLink}
                  to="/register"
                  borderRadius="3xl"
                  px="10"
                  bgColor="black"
                  color="white"
                  _hover={{ bgColor: "gray.400", color: "black" }}
                >
                  Ingresar
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

export default Login;
