import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Field, ID, Int, ObjectType } from "type-graphql";
import { User } from "./User";
import { TypeormLoader } from "type-graphql-dataloader";
import { Like } from "./Like";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({})
  title!: string;

  @Field()
  @Column("text")
  content!: string;

  @Field()
  @Column({ unique: true })
  slug!: string;

  @Field()
  @Column()
  picture!: string;

  @Field()
  @Column()
  time!: string;

  @Field((type) => Date)
  @CreateDateColumn()
  created!: Date;

  @Field((type) => Date)
  @UpdateDateColumn()
  updated!: Date;

  @Column()
  authorId!: number;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.posts, { onDelete: "CASCADE" })
  @TypeormLoader()
  @JoinColumn({ name: "authorId" })
  author!: User;

  @Field((type) => [Like])
  @OneToMany(() => Like, (like) => like.postId)
  @TypeormLoader()
  likes!: Like[];

  @Field((type) => Int, { defaultValue: 0, nullable: true })
  likeCount!: number;
}
