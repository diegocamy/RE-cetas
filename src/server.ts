import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import "reflect-metadata";
import { BookResolver } from "./graphql/BookResolver";

const PORT = 4000;

const app = express();

async function startServer() {
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
