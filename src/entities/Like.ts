import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@ObjectType()
@Entity()
export class Like extends BaseEntity {
  @PrimaryColumn()
  userId!: number;

  @PrimaryColumn()
  postId!: number;

  @Field((type) => Post)
  @ManyToOne(() => Post, (post) => post.likes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "postId" })
  post!: Post;

  @Field((type) => User)
  @ManyToOne(() => User, (user) => user.likedPosts, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: User;
}
