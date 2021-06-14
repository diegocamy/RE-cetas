import { InputType, Field } from "type-graphql";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import { User } from "../entities/User";

@InputType()
export class RegisterUserInput implements Partial<User> {
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

  @Field()
  @MinLength(5, {
    message: "La contraseña debe contener al menos 5 caracteres",
  })
  @MaxLength(30, {
    message: "La contraseña debe contener máximo 30 caracteres",
  })
  password!: string;
}
