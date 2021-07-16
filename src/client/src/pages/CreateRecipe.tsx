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
  Heading,
} from "@chakra-ui/react";
import TextEditor from "../components/TextEditor";
import { useState, useEffect } from "react";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import draftToHTML from "draftjs-to-html";
import PreviewPost from "../components/PreviewPost";

function CreateRecipe() {
  const toast = useToast();
  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<string | undefined>();
  const [markup, setMarkup] = useState<string>(() => {
    const data = localStorage.getItem("receta");
    if (!data) {
      return "";
    }

    return JSON.parse(data);
  });
  const [editorState, setEditorState] = useState<EditorState>(() => {
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

  useEffect(() => {
    const rawState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHTML(rawState);

    setMarkup(markup);
  }, [editorState]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  const submitPost = () => {
    const values = {
      title,
      image: selectedFile,
      content: convertToRaw(editorState.getCurrentContent()),
    };

    console.log(values);
  };

  return (
    <Box bg="gray.100" py="3" minHeight="100%">
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
              <form onSubmit={(e) => e.preventDefault()}>
                <InputGroup mb="2" display="flex" flexDirection="column">
                  <FormLabel htmlFor="title">Titulo</FormLabel>
                  <Input
                    bg="white"
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </InputGroup>
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
              </form>
              <TextEditor
                editorState={editorState}
                setEditorState={setEditorState}
              />
            </TabPanel>
            <TabPanel p="0" my="3">
              <PreviewPost
                markup={markup}
                title={title}
                image={preview ? preview : ""}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Flex justifyContent="flex-end" mt="2">
          <Button color="white" bgColor="blue.500" onClick={submitPost}>
            Publicar
          </Button>
        </Flex>
      </Container>
    </Box>
  );
}

export default CreateRecipe;
