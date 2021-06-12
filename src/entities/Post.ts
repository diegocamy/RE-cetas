import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Field, ID, Int, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class Post {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column("text")
  content!: string;

  @Field()
  @Column()
  slug!: string;

  @Field()
  @Column()
  picture!: string;

  @Field((type) => Int)
  @Column({ default: 0, nullable: true })
  likes!: number;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.posts, { onDelete: "CASCADE" })
  author!: User;
}
