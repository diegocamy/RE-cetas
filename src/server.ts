import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import connection from "./typeorm/connection";
import { UserResolver } from "./resolvers/user-resolver";

const PORT = 4000;

const app = express();

async function startServer() {
  try {
    await connection();
  } catch (error) {
    console.log(error);
  }

  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  const server = new ApolloServer({
    schema,
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
