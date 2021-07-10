import { InputType, Field } from "type-graphql";
import { MaxLength } from "class-validator";
import { User } from "../entities/User";

@InputType()
export class EditUserBioAndAvatarInput implements Partial<User> {
  @Field({ nullable: true })
  @MaxLength(150, {
    message: "No puede exceder los 150 caracteres",
  })
  bio!: string;

  @Field({ nullable: true })
  avatar!: string;
}
