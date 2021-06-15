import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import connection from "./typeorm/connection";
import { UserResolver } from "./resolvers/user-resolver";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { IRefreshToken, TokenPayload } from "./interfaces";
import { User } from "./entities/User";
import { generateCookie } from "./utils/cookie";
import { generateAccessToken, generateRefreshToken } from "./utils/jwt";
import { RefreshToken } from "./entities/RefreshToken";
import { getConnection } from "typeorm";

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

  app.post("/refresh_token", cookieParser(), async (req, res) => {
    const refreshToken = req.cookies.rtk;
    if (!refreshToken) {
      return res.json({ ok: false, jwt: "" });
    }

    //verify refresh token
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
    } catch (error) {
      return res.json({ ok: false, jwt: "" });
    }

    //retrieve saved refresh token for current user from db
    try {
      const savedRefreshToken = (await RefreshToken.findOne({
        where: { user: user },
      })) as IRefreshToken;
      const { refresh_token } = savedRefreshToken;

      //check if provided refresh token matches the one stored in db
      const match = refresh_token.localeCompare(refreshToken);

      //if match is 0 means they are the same
      if (match !== 0) {
        return res.json({ ok: false, jwt: "" });
      }
    } catch (error) {
      return res.json({ ok: false, jwt: "" });
    }

    //create new refresh token
    const newRefreshToken = generateRefreshToken(user!);

    //save new refresh token in db
    try {
      await getConnection()
        .createQueryBuilder()
        .update(RefreshToken)
        .set({ refresh_token: newRefreshToken })
        .where(`user_id = ${user!.id}`)
        .execute();
    } catch (error) {
      console.log(error);
      return res.json({ ok: false, jwt: "" });
    }

    //set refresh token
    generateCookie("rtk", res, newRefreshToken);

    //generate access token
    const token = generateAccessToken(user!);
    const { exp } = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as TokenPayload;

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
