import { Arg, Ctx, Mutation } from "type-graphql";
import { User } from "../../entities/User";
import { MyContext, TokenPayload } from "../../interfaces";
import { JWTPayload } from "../../object-types/JWTPayload";
import {
  expireRedisAsync,
  getRedisAsync,
  redisClient,
  setRedisAsync,
} from "../../server";
import { generateCookie } from "../../utils/cookie";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import jwt from "jsonwebtoken";

export class ConfirmAccountResolver {
  @Mutation(() => JWTPayload, { nullable: true })
  async confirmAccount(
    @Arg("token") token: string,
    @Ctx() { res }: MyContext
  ): Promise<null | JWTPayload> {
    //check if token is in redis
    const userId = await getRedisAsync("confirmation" + token);

    if (!userId) {
      return null;
    }

    const user = await User.findOne({ where: { id: Number.parseInt(userId) } });

    if (!user) {
      return null;
    }

    user.confirmed = true;

    await user.save();

    //delete token from redis
    redisClient.del("confirmation" + token);

    //Log the user

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
  }
}
