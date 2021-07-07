import { useContext, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  useMediaQuery,
  Link,
} from "@chakra-ui/react";
import kitchen from "../assets/kitchen.png";
import { Formik, Form } from "formik";
import InputField from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import * as Yup from "yup";
import { Link as RouterLink, Redirect } from "react-router-dom";
import { setAccessToken } from "../auth/jwt";
import { AuthContext } from "../App";

interface ValidationError {
  children: any[];
  constraints: {
    [key: string]: string;
  };
  property: string;
}

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email("Debe ingresar un correo electrónico válido")
    .required("Debe ingresar un correo electrónico"),
  password: Yup.string().required("Debe ingresar una contraseña"),
});

function Login() {
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
        boxShadow="lg"
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
              const errors: { [key: string]: string } = {};
              err?.graphQLErrors[0].extensions?.exception?.validationErrors.forEach(
                (validationError: ValidationError) => {
                  errors[validationError.property] = Object.values(
                    validationError.constraints
                  )[0];
                }
              );
              setErrors(errors);
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
                <Link textAlign="right" as={RouterLink} to="/register">
                  Aún no tenés una cuenta? Registrate
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
        boxShadow="xl"
        zIndex="0"
      />
    </Flex>
  );
}

export default Login;
