import { Request, Response } from "express";

export interface MyContext {
  req: Request;
  res: Response;
  payload?: TokenPayload;
}

export interface TokenPayload {
  userId: number;
  iat: number;
  exp: number;
}

export interface IRefreshToken {
  id: number;
  refresh_token: string;
}
