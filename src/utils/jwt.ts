import jwt from "jsonwebtoken";
import { User } from "../entities/User";

export const generateAccessToken = (user: User) => {
  return jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (user: User) => {
  return jwt.sign(
    { userId: user.id, token_version: user.token_version },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "7d",
    }
  );
};
