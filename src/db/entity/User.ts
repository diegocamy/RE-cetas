import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { Post } from "./Post";

@Entity()
export class User {
  @PrimaryColumn()
  id!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column({ length: 15 })
  username!: string;

  @Column({ nullable: true })
  bio!: string;

  @OneToMany((type) => Post, (post) => post.author)
  posts!: Post[];
}
