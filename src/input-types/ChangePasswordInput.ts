import { Field, InputType } from "type-graphql";
import { PasswordType } from "./PasswordType";

@InputType()
export class ChangePasswordInput extends PasswordType {
  @Field()
  token!: string;
}
