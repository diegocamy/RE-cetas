import { Box, Button, Flex, Heading, useMediaQuery } from "@chakra-ui/react";
import kitchen from "../assets/kitchen.png";
import { Formik, Form } from "formik";
import InputField from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";

interface ValidationError {
  children: any[];
  constraints: {
    [key: string]: string;
  };
  property: string;
}

function Register() {
  const [isMobile] = useMediaQuery("(min-width: 786px)");
  const [register] = useRegisterMutation();

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
          Crea tu cuenta
        </Heading>
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            try {
              await register({
                variables: values,
              });
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
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="username"
                placeholder="Nombre de usuario"
                label="Nombre de usuario"
              />
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
              />
              <Button isLoading={isSubmitting} type="submit" my="8">
                Registrar
              </Button>
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

export default Register;
