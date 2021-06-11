import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Post {
  @PrimaryColumn()
  id!: string;

  @Column()
  title!: string;

  @Column("text")
  content!: string;

  @Column()
  picture!: string;

  @Column()
  likes!: number;

  @ManyToOne((type) => User, (user) => user.posts, { onDelete: "CASCADE" })
  author!: User;
}
