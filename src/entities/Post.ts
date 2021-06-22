import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Field, ID, Int, ObjectType } from "type-graphql";
import { User } from "./User";
import { TypeormLoader } from "type-graphql-dataloader";

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

  @Field((type) => Int)
  @Column({ default: 0, nullable: true })
  likes!: number;

  @Field((type) => Date)
  @CreateDateColumn()
  created!: Date;

  @Field((type) => Date)
  @UpdateDateColumn()
  updated!: Date;

  @Column()
  authorId!: number;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.posts, { cascade: true })
  @TypeormLoader()
  @JoinColumn({ name: "authorId" })
  author!: User;
}
