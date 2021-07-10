import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Field, ID, Int, ObjectType } from "type-graphql";
import { Post } from "./Post";
import { TypeormLoader } from "type-graphql-dataloader";
import { Like } from "./Like";
import { Follow } from "./Follow";
// import { Follow } from "./Follow";

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
  @Column({ nullable: true, length: 150 })
  bio!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar!: string;

  @Field((type) => Date)
  @CreateDateColumn()
  created!: Date;

  @Field((type) => Date)
  @UpdateDateColumn()
  updated!: Date;

  @Column()
  token_version!: string;

  @Column({ default: false })
  confirmed!: boolean;

  @Field((type) => [Post])
  @OneToMany((type) => Post, (post) => post.author)
  @TypeormLoader()
  posts!: Post[];

  @Field((type) => [Like])
  @OneToMany((type) => Like, (like) => like.userId)
  @TypeormLoader()
  likedPosts!: Like[];

  @Field((type) => Int)
  postCount!: number;

  @Field((type) => [Follow])
  @OneToMany((type) => Follow, (follow) => follow.follower)
  @TypeormLoader()
  following!: Follow[];

  @Field((type) => [Follow])
  @OneToMany((type) => Follow, (follow) => follow.following)
  @TypeormLoader()
  followers!: Follow[];

  @Field()
  followersCount!: number;

  @Field()
  followingCount!: number;
}
