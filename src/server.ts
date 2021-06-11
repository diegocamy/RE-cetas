import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { BookResolver } from "./graphql/BookResolver";
import { createConnection } from "typeorm";
import { User } from "./db/entity/User";
import { Post } from "./db/entity/Post";

const PORT = 4000;

const app = express();

async function startServer() {
  createConnection({
    type: "postgres",
    host: "localhost",
    port: 7777,
    username: "postgres",
    password: "postgres",
    database: "recetas",
    entities: [User, Post],
    synchronize: true,
    logging: false,
  })
    .then(async (connection) => {
      let user = new User();
      user.id = "1";
      user.email = "hola@gmail.com";
      user.password = "asdasdasd";
      user.username = "asdasd";

      await connection.manager.save(user);
      console.log("New user saved");

      const post1 = new Post();
      post1.id = "1";
      post1.title = "first post";
      post1.content = "This is my first post";
      post1.likes = 10;
      post1.picture = "post url";
      post1.author = user;

      await connection.manager.save(post1);
      console.log("post saved");

      let savedUsers = await connection
        .getRepository(User)
        .createQueryBuilder("user")
        .innerJoinAndSelect("user.posts", "post")
        .where("user.id = :id", { id: 1 })
        .getOne();

      console.log("All users from db: ", savedUsers);
    })
    .catch((error) => console.log(error));

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [BookResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  server.applyMiddleware({ app });

  app.get("/", (req, res) => {
    res.json({
      hello: "world",
    });
  });

  app.listen({ port: PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();
