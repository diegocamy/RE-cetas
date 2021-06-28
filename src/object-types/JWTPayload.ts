import { Field, Int, ObjectType } from "type-graphql";
import { User } from "../entities/User";

@ObjectType()
export class JWTPayload {
  @Field()
  jwt!: string;

  @Field(() => Int)
  exp!: number;

  @Field(() => User)
  user!: User;
}
