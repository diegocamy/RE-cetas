import { MaxLength, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class PasswordType {
  @MinLength(5, {
    message: "La contraseña debe contener al menos 5 caracteres",
  })
  @MaxLength(30, {
    message: "La contraseña debe contener máximo 30 caracteres",
  })
  @Field()
  password!: string;
}
