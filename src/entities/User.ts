import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { Post } from "./Post";
import { v4 } from "uuid";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  email!: string;

  @Column()
  password!: string;

  @Field()
  @Column({ length: 15, unique: true })
  username!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  bio!: string;

  @Field((type) => Date)
  @CreateDateColumn()
  created!: Date;

  @Field((type) => Date)
  @UpdateDateColumn()
  updated!: Date;

  @Column({ default: v4() })
  token_version!: string;

  @Column({ default: false })
  confirmed!: boolean;

  @Field((type) => Post)
  @OneToMany((type) => Post, (post) => post.author)
  posts!: Post[];
}
