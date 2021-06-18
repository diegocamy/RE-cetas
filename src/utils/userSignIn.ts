import { Response } from "express";
import { User } from "../entities/User";
import { expireRedisAsync, setRedisAsync } from "../server";
import { generateCookie } from "./cookie";
import { generateAccessToken, generateRefreshToken } from "./jwt";
import jwt from "jsonwebtoken";
import { JWTPayload } from "../object-types/JWTPayload";
import { TokenPayload } from "../interfaces";

export const userSignIn = async (
  user: User,
  res: Response
): Promise<JWTPayload> => {
  //generate refresh token
  const refreshToken = generateRefreshToken(user);

  //save refresh token in redis
  await setRedisAsync(refreshToken, refreshToken);
  await expireRedisAsync(refreshToken, 60 * 60 * 24 * 7);

  //generate cookie with refresh token
  generateCookie("rtk", res, refreshToken);

  //generate access token
  const accessToken = generateAccessToken(user);

  //extract exp property from access token
  const { exp } = jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET!
  ) as TokenPayload;

  return {
    jwt: accessToken,
    exp,
  };
};
