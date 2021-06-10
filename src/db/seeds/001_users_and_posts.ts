import { Knex } from "knex";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

const idUsers = [uuid(), uuid(), uuid()];

function randomPassword(): string {
  return Math.random().toString(36).replace("0.", "");
}

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("posts").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      id: idUsers[0],
      username: "diego",
      email: "diego@gmail.com",
      password: await bcrypt.hash(randomPassword(), 12),
      bio: "asdadasd asd asd sa d asd as d asd",
    },
    {
      id: idUsers[1],
      username: "diego2",
      email: "diego2@gmail.com",
      password: await bcrypt.hash(randomPassword(), 12),
      bio: "asdadasd asd asd sa d asd as d asd",
    },
    {
      id: idUsers[2],
      username: "diego3",
      email: "diego3@gmail.com",
      password: await bcrypt.hash(randomPassword(), 12),
      bio: "asdadasd asd asd sa d asd as d asd",
    },
  ]);

  await knex("posts").insert([
    {
      id: uuid(),
      author: idUsers[0],
      title: "post 1",
      slug: "post-1" + "-" + idUsers[0].split("-")[0],
      content: "content 1",
      image: "image 1",
    },
    {
      id: uuid(),
      author: idUsers[1],
      title: "post 1",
      slug: "post-1" + "-" + idUsers[1].split("-")[0],
      content: "content 1",
      image: "image 1",
    },
    {
      id: uuid(),
      author: idUsers[2],
      title: "post 1",
      slug: "post-1" + "-" + idUsers[2].split("-")[0],
      content: "content 1",
      image: "image 1",
    },
  ]);
}
