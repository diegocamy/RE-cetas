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
    dateScalarMode: "timestamp",
  });

  const server = new ApolloServer({
    schema,
    formatError: (err) => {
      const errExtensions = err.extensions;
      //Check error created by class-validator and if there is one,
      //set it to be the GraphqlError message
      if (errExtensions!.exception.validationErrors) {
        const validationErrors = errExtensions!.exception.validationErrors;
        const constraints = validationErrors[0].constraints;
        const errMessage = Object.values(constraints)[0] as string;
        err.message = errMessage;
      }

      return err;
    },
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
