import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import connection from "./typeorm/connection";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { TokenPayload } from "./interfaces";
import { User } from "./entities/User";
import { redisClient } from "./redis/redis";
import { userSignIn } from "./utils/userSignIn";
import { ApolloServerLoaderPlugin } from "type-graphql-dataloader";
import { getConnection } from "typeorm";
import cors,{CorsOptions} from 'cors'

const PORT = 4000;

const app = express();

const corsOptions: CorsOptions  = {
  origin:'http://localhost:3000',
  credentials: true
}

async function startServer() {
  try {
    await connection();
  } catch (error) {
    console.log(error);
  }

  const schema = await buildSchema({
    resolvers: [
      __dirname + "/modules/**/*.resolver.{ts,js}",
      __dirname + "/resolvers/**/*.{ts,js}",
    ],
    dateScalarMode: "timestamp",
  });

  app.use(cors(corsOptions))

  app.post("/refresh_token", cookieParser(), async (req, res) => {
    //extract refresh token from cookie
    const refreshToken = req.cookies.rtk as string;

    if (!refreshToken) {
      return res.json({ ok: false, jwt: "" });
    }

    //verify if refresh token is valid
    let payload;
    try {
      payload = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!
      ) as TokenPayload;
    } catch (error) {
      return res.json({ ok: false, jwt: "" });
    }

    //search user in db using userId from token
    let user: User | undefined;
    try {
      user = await User.findOne({ where: { id: payload.userId } });

      if (!user) {
        return res.json({ ok: false, jwt: "" });
      }
    } catch (error) {
      return res.json({ ok: false, jwt: "" });
    }

    //compare token_version from user and token
    const compare = payload.token_version.localeCompare(user.token_version);

    //if compare is different from 0, token_versions are not the same
    if (compare !== 0) {
      //delete refresh token from redis
      redisClient.del(refreshToken, (err, res) => {
        if (res === 1) {
          console.log("deleted");
        }
      });
      return res.json({ ok: false, jwt: "" });
    }

    //IF EVERYTHING IS OK THEN...

    //delete old cookie from redis
    redisClient.del(refreshToken, (err, res) => {
      if (res === 1) {
        console.log("deleted");
      }
    });

    //log user in
    const { exp, jwt: token } = await userSignIn(user, res);

    return res.json({ ok: true, jwt: token, exp });
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
    plugins: [
      ApolloServerLoaderPlugin({
        typeormGetConnection: getConnection,
      }),
    ],
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
