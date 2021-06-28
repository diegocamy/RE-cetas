import { MiddlewareFn } from "type-graphql";
import jwt from "jsonwebtoken";
import { MyContext, TokenPayload } from "../interfaces";
import { AuthenticationError } from "apollo-server-express";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  //extract access token from authorization header
  const authHeader = context.req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) throw new AuthenticationError("Unauthorized");

  //check if access token is valid
  try {
    const payload = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as TokenPayload;
    //add user id to context object
    context.payload = payload;
  } catch (error) {
    throw new AuthenticationError("Unauthorized");
  }

  await next();
};
