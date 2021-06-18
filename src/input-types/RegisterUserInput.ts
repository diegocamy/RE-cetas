import { InputType, Field } from "type-graphql";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import { User } from "../entities/User";
import { PasswordType } from "./PasswordType";

@InputType()
export class RegisterUserInput extends PasswordType implements Partial<User> {
  @Field()
  @MinLength(4, {
    message: "El nombre de usuario debe contener al menos 4 caracteres",
  })
  @MaxLength(15, {
    message: "El nombre de usuario debe contener a menos 15 caracteres",
  })
  username!: string;

  @Field()
  @IsEmail({}, { message: "Debe ingresar un correo electrónico válido" })
  email!: string;
}
