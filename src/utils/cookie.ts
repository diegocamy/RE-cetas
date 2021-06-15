import { Response } from "express";

export const generateCookie = (
  cookieName: string,
  res: Response,
  token: string
) => {
  return res.cookie(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
};
