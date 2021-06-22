import { Field, ID, InputType } from "type-graphql";

@InputType()
export class PostSearchInputType {
  @Field(() => ID, { nullable: true })
  id!: number;

  @Field({ nullable: true })
  slug!: string;

  @Field({ nullable: true })
  title!: string;

  @Field({ nullable: true })
  authorId!: number;
}
