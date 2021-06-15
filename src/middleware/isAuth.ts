import { MiddlewareFn } from "type-graphql";
import jwt from "jsonwebtoken";
import { MyContext, TokenPayload } from "../interfaces";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  //extract access token from cookie in headers
  const accessToken = context.req.cookies.atk as string | undefined;

  if (!accessToken) throw new Error("Unauthorized");

  //check if access token is valid
  try {
    const payload = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET!
    ) as TokenPayload;
    //add user id to context object
    context.payload = payload;
  } catch (error) {
    throw new Error("Unauthorized");
  }

  await next();
};
