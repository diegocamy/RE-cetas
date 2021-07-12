import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { getFormValidationErrors } from "../utils/validationErrors";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import {
  useUploadImageMutation,
  useEditUserDataMutation,
  MeDocument,
  MeQuery,
} from "../generated/graphql";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  bio: string;
  avatar: string;
}

const RegisterSchema = Yup.object().shape({
  bio: Yup.string().max(150, "Debe contener como máximo 150 caracteres"),
  image: Yup.string(),
});

function EditProfileModal({ isOpen, onClose, avatar, bio }: Props) {
  const toast = useToast();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<string | undefined>();
  const [uploadImage] = useUploadImageMutation();
  const [editUserData] = useEditUserDataMutation();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(avatar);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile, avatar]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar perfil</ModalHeader>
        <Formik
          initialValues={{
            bio: bio,
            avatar: avatar,
          }}
          onSubmit={async (values, { setErrors }) => {
            try {
              const { bio } = values;
              let newAvatar = avatar;

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

                const response = await uploadImage({
                  variables: { image: selectedFile },
                });

                if (response.data) {
                  newAvatar = response.data.imageUpload;
                }
              }

              await editUserData({
                variables: {
                  avatar: newAvatar,
                  bio,
                },
                update: async (cache, { data }) => {
                  const meData = cache.readQuery<MeQuery>({
                    query: MeDocument,
                  });

                  cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                      me: {
                        ...meData!.me,
                        avatar: data!.editUserBioAndAvatar.avatar,
                        bio: data!.editUserBioAndAvatar.bio,
                      },
                    },
                  });
                },
              });

              toast({
                title: "Perfil actualizado",
                description: "Se ha actualizado tu perfil",
                status: "success",
                isClosable: true,
                position: "top",
              });

              onClose();
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
              <ModalCloseButton disabled={isSubmitting} />
              <ModalBody pb={6}>
                {preview && (
                  <Box textAlign="center">
                    <Text>Foto seleccionada</Text>
                    <Image
                      width="100px"
                      height="100px"
                      objectFit="cover"
                      borderRadius="50%"
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
                <Field name="bio">
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.bio && form.touched.bio}
                    >
                      <FormLabel htmlFor="bio">Sobre ti</FormLabel>
                      <Textarea
                        {...field}
                        id="bio"
                        placeholder="Escribe un poco sobre ti, (máximo 150 caracteres)"
                        resize="none"
                      />
                      <FormErrorMessage>{form.errors.bio}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </ModalBody>
              <ModalFooter display="flex" justifyContent="space-evenly">
                <Button
                  isLoading={isSubmitting}
                  type="submit"
                  borderRadius="3xl"
                  px="10"
                  bgColor="#f7cf1c"
                  color="black"
                  _hover={{ bgColor: "gray.400" }}
                >
                  Guardar
                </Button>
                <Button
                  disabled={isSubmitting}
                  borderRadius="3xl"
                  px="10"
                  bgColor="black"
                  color="white"
                  _hover={{ bgColor: "gray.400", color: "black" }}
                  onClick={onClose}
                >
                  Cancelar
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
}

export default EditProfileModal;
