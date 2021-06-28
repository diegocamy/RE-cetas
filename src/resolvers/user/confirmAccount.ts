import { Arg, Ctx, Mutation } from "type-graphql";
import { User } from "../../entities/User";
import { MyContext, TokenPayload } from "../../interfaces";
import { JWTPayload } from "../../object-types/JWTPayload";
import { generateCookie } from "../../utils/cookie";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import jwt from "jsonwebtoken";
import { expire, get, redisClient, set } from "../../redis/redis";
import { confirmAccount } from "../../utils/constants";

export class ConfirmAccountResolver {
  @Mutation(() => JWTPayload, { nullable: true })
  async confirmAccount(
    @Arg("token") token: string,
    @Ctx() { res }: MyContext
  ): Promise<null | JWTPayload> {
    //check if token is in redis
    const userId = await get(confirmAccount + token);

    if (!userId) throw new Error("Error al confirmar la cuenta");

    const user = await User.findOne({ where: { id: Number.parseInt(userId) } });

    if (!user) throw new Error("Error al confirmar la cuenta");

    user.confirmed = true;

    await user.save();

    //delete token from redis
    redisClient.del(confirmAccount + token);

    //Log the user

    //generate refresh token
    const refreshToken = generateRefreshToken(user);

    //save refresh token in redis
    await set(refreshToken, refreshToken);
    await expire(refreshToken, 60 * 60 * 24 * 7);

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
      user,
    };
  }
}
