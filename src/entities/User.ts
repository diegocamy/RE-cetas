import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

import { Post } from "./Post";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  email!: string;

  @Field()
  @Column()
  password!: string;

  @Field()
  @Column({ length: 15, unique: true })
  username!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  bio!: string;

  @Field((type) => Post)
  @OneToMany((type) => Post, (post) => post.author)
  posts!: Post[];
}
