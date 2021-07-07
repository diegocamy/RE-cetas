import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useField } from "formik";
import { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

function InputField({ label, size: _, ...props }: InputFieldProps) {
  const [field, meta] = useField(props);
  return (
    <FormControl isInvalid={meta.error && meta.touched ? true : false} mb="2">
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
      />
      {meta.error ? <FormErrorMessage>{meta.error}</FormErrorMessage> : null}
    </FormControl>
  );
}

export default InputField;
