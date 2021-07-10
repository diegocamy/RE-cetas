import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Follow extends BaseEntity {
  @PrimaryColumn()
  followerId!: number;

  @PrimaryColumn()
  followingId!: number;

  @ManyToOne((type) => User, (user) => user.following)
  @JoinColumn({ name: "followerId" })
  @Field((type) => User)
  follower!: User;

  @ManyToOne((type) => User, (user) => user.followers)
  @JoinColumn({ name: "followingId" })
  @Field((type) => User)
  following!: User;
}
