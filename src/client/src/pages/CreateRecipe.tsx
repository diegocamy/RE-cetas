import {
  Box,
  Button,
  Container,
  FormLabel,
  Input,
  InputGroup,
  Image,
  useToast,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import TextEditor, { myBockStyleFn } from "../components/TextEditor";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useState, useEffect } from "react";
import { getFormValidationErrors } from "../utils/validationErrors";
import InputField from "../components/InputField";
import { convertFromRaw, Editor, EditorState } from "draft-js";

const RegisterSchema = Yup.object().shape({
  title: Yup.string().required("Debe ingresar un título"),
  image: Yup.string(),
  content: Yup.string(),
});

function CreateRecipe() {
  const toast = useToast();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<string | undefined>();
  const [editorState, setEditorState] = useState(() => {
    const data = localStorage.getItem("receta");
    if (!data) {
      return EditorState.createEmpty();
    }

    return EditorState.createWithContent(convertFromRaw(JSON.parse(data))); //return editor content from the localstorage
  });

  useEffect(() => {
    if (!selectedFile) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  return (
    <Box bg="gray.100" py="2" minHeight="100%">
      <Container maxW="container.lg">
        <Tabs align="end" variant="unstyled">
          <TabList>
            <Tab
              _selected={{ color: "white", bg: "blue.500", borderRadius: "md" }}
            >
              Editar
            </Tab>
            <Tab
              _selected={{ color: "white", bg: "blue.500", borderRadius: "md" }}
            >
              Visualizar
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel p="0" my="3">
              <Formik
                initialValues={{
                  title: "",
                  image: "",
                  content: "",
                }}
                onSubmit={async (values, { setErrors }) => {
                  try {
                    const { title, content, image } = values;
                    let newAvatar = image;

                    if (selectedFile) {
                      //check if image size is greater than 10mb
                      if (selectedFile.size > 10000000) {
                        return toast({
                          title: "Error al subir la imagen",
                          description: "El archivo no puede pesar mas de 10Mb",
                          status: "error",
                          position: "top",
                          isClosable: true,
                        });
                      }
                    }
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
                      type="text"
                      id="title"
                      label="Titulo"
                      name="title"
                      style={{ backgroundColor: "white" }}
                    />
                    {preview && (
                      <Box textAlign="center">
                        <Image
                          width="100%"
                          height="400px"
                          objectFit="cover"
                          src={preview}
                          m="auto"
                        />
                      </Box>
                    )}
                    <InputGroup mb="2">
                      <FormLabel
                        htmlFor="image"
                        py="2"
                        background="amarillo"
                        color="black"
                        borderRadius="xl"
                        fontWeight="bold"
                        w="100%"
                        textAlign="center"
                        m="auto"
                        my="2"
                        _hover={{ cursor: "pointer", background: "gray.300" }}
                      >
                        {preview ? "Elegir otra foto..." : "Elegir una foto..."}
                      </FormLabel>
                      <Input
                        type="file"
                        name="image"
                        multiple={false}
                        onChange={onSelectFile}
                        id="image"
                        position="absolute"
                        opacity="0"
                        zIndex="-1"
                      />
                    </InputGroup>
                  </Form>
                )}
              </Formik>
              <TextEditor
                editorState={editorState}
                setEditorState={setEditorState}
              />
              <Flex justifyContent="flex-end">
                <Button color="white" bgColor="blue.500" type="submit">
                  Publicar
                </Button>
              </Flex>
            </TabPanel>
            <TabPanel p="0" my="3">
              {preview && (
                <Box textAlign="center">
                  <Image
                    width="100%"
                    height="400px"
                    objectFit="cover"
                    src={preview}
                    m="auto"
                  />
                </Box>
              )}
              <Box w="100%" overflowY="auto" bgColor="white" p="2">
                {/* <Editor
                  editorState={editorState}
                  onChange={() => {}}
                  placeholder="Tu receta..."
                  readOnly={true}
                  blockStyleFn={myBockStyleFn}
                /> */}
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
}

export default CreateRecipe;
