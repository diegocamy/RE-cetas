import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class JWTPayload {
  @Field()
  jwt!: string;
  @Field(() => Int)
  exp!: number;
}
