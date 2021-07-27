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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import TextEditor from "../components/TextEditor";
import { useState, useEffect } from "react";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import draftToHTML from "draftjs-to-html";
import PreviewPost from "../components/PreviewPost";
import { validatePostContent } from "../utils/checkPostContent";
import {
  useEditPostMutation,
  useUploadImageMutation,
  useGetPostLazyQuery,
} from "../generated/graphql";
import { Redirect, useHistory, useParams } from "react-router-dom";

interface Params {
  slug: string;
}

function EditRecipe() {
  const history = useHistory();
  const { slug } = useParams<Params>();
  const [executeQuery, { loading, data, error }] = useGetPostLazyQuery({
    variables: { slug },
    fetchPolicy: "network-only",
  });
  const toast = useToast();
  const [uploadImage] = useUploadImageMutation();
  const [editPost] = useEditPostMutation();
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("0");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<string | undefined>();
  const [markup, setMarkup] = useState<string>("");
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  //load data
  useEffect(() => {
    let _isMounted = true;

    if (_isMounted) {
      executeQuery();
    }

    return () => {
      _isMounted = false;
    };
  }, [executeQuery]);

  useEffect(() => {
    if (data) {
      const { getPost: post } = data;
      if (!post) {
        console.log("no post");
        return history.push("/404");
      }
      setTime(post.time);
      setTitle(post.title);
      setPreview(post.picture);

      const editorContent = convertFromRaw(JSON.parse(post.content));
      setEditorState(EditorState.createWithContent(editorContent));
    }
  }, [data]);

  //change image preview url
  useEffect(() => {
    if (!selectedFile) {
      setPreview(data?.getPost?.picture);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile, data?.getPost?.picture]);

  //create markup
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

  const submitPost = async () => {
    const values = {
      title,
      image: selectedFile || preview,
      content: convertToRaw(editorState.getCurrentContent()),
      imageUrl: "",
      time,
    };

    const isValid = validatePostContent(values, toast);
    if (!isValid) return;

    setIsSubmitting(true);

    //upload image to cloudinary if the user chose another image
    if (values.image instanceof File) {
      try {
        const { data } = await uploadImage({
          variables: { image: values.image },
        });
        if (!data) return;
        //add the updated image url to the values object
        values.imageUrl = data.imageUpload;
      } catch (err) {
        return toast({
          position: "top",
          title: "Error",
          status: "error",
          description: err.message,
          isClosable: true,
        });
      }
    } else {
      values.imageUrl = values.image!;
    }

    //save the post in the database
    try {
      const { data } = await editPost({
        variables: {
          slug,
          content: JSON.stringify(values.content),
          picture: values.imageUrl,
          title: values.title,
          time: values.time,
        },
      });
      if (!data) return;

      setIsSubmitting(false);

      history.push(`/recipe/${data.editPost.slug}`);
    } catch (err) {
      return toast({
        position: "top",
        title: "Error",
        status: "error",
        description: err.message,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return null;
  }

  if (!data && error) {
    return <Redirect to={"/404"} />;
  }

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
                <InputGroup mb="2" display="flex" flexDirection="column">
                  <FormLabel htmlFor="time">
                    Tiempo de preparación (minutos)
                  </FormLabel>
                  <NumberInput
                    step={5}
                    defaultValue={0}
                    min={0}
                    max={360}
                    id="time"
                    name="time"
                    value={time}
                    onChange={(value) => setTime(value)}
                  >
                    <NumberInputField bg="white" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
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
                time={time}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Flex justifyContent="flex-end" mt="2">
          <Button
            color="white"
            bgColor="blue.500"
            onClick={submitPost}
            _hover={{ bgColor: "blue.700" }}
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Actualizar
          </Button>
        </Flex>
      </Container>
    </Box>
  );
}

export default EditRecipe;
