import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputRightElement,
  InputGroup,
  Icon,
} from "@chakra-ui/react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useField } from "formik";
import { InputHTMLAttributes, useState } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  showPasswordButton?: boolean;
};

function InputField({
  label,
  size: _,
  showPasswordButton,
  ...props
}: InputFieldProps) {
  const [show, setShow] = useState(false);
  const [field, meta] = useField(props);
  const handleClick = () => setShow(!show);

  return (
    <FormControl isInvalid={meta.error && meta.touched ? true : false} mb="2">
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputGroup>
        <Input
          {...field}
          {...props}
          id={field.name}
          placeholder={props.placeholder}
          type={showPasswordButton ? (show ? "text" : "password") : props.type}
        />
        {showPasswordButton && (
          <InputRightElement width="4.5rem">
            <Icon
              aria-label="show or hide password"
              _hover={{ cursor: "pointer" }}
              h="5"
              w="5"
              onClick={handleClick}
              as={show ? HiEyeOff : HiEye}
            />
          </InputRightElement>
        )}
      </InputGroup>
      {meta.error ? <FormErrorMessage>{meta.error}</FormErrorMessage> : null}
    </FormControl>
  );
}

export default InputField;
