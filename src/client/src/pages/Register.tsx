import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Text,
  Tooltip,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import kitchen from "../assets/kitchen.png";
import { Formik, Form, Field } from "formik";
import InputField from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import * as Yup from "yup";
import { Link, Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../App";
import { getFormValidationErrors } from "../utils/validationErrors";

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "El nombre de usuario debe tener al menos 4 caracteres")
    .max(15, "El nombre de usuario debe tener como máximo 15 caracteres")
    .required("Debe ingresar un nombre de usuario"),
  email: Yup.string()
    .email("Debe ingresar una dirección de correo válida")
    .required("Debe ingresar una dirección de correo"),
  password: Yup.string()
    .min(5, "La contraseña debe tener al menos 5 caracteres")
    .max(30, "La contraseña debe tener como máximo 30 caracteres")
    .required("Debe ingresar una contraseña"),
  terms: Yup.bool().oneOf([true], "Debe aceptar los términos y condiciones"),
});

function Register() {
  const { user } = useContext(AuthContext);
  const [isMobile] = useMediaQuery("(min-width: 786px)");
  const [register] = useRegisterMutation();
  const toast = useToast();

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
          Crea tu cuenta
        </Heading>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            terms: false,
          }}
          onSubmit={async (values, { setErrors }) => {
            try {
              await register({
                variables: values,
              });
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
          {({ isSubmitting, errors, touched }) => (
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
                showPasswordButton
              />
              <Field type="checkbox" name="terms">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.terms && form.touched.terms}
                  >
                    <Checkbox {...field} id="terms">
                      Acepto los{" "}
                      <Tooltip hasArrow label="Mentira, no existen">
                        <Text decoration="underline" display="inline">
                          términos y condiciones
                        </Text>
                      </Tooltip>
                    </Checkbox>
                    <FormErrorMessage>{form.errors.terms}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
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
                  Registrar
                </Button>
                <Button
                  as={Link}
                  to="/login"
                  borderRadius="3xl"
                  px="10"
                  bgColor="black"
                  color="white"
                  _hover={{ color: "black", bgColor: "gray.400" }}
                  disabled={isSubmitting}
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

export default Register;
