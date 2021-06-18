import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../../entities/User";
import bcrypt from "bcrypt";
import { RegisterUserInput } from "../../input-types/RegisterUserInput";
import { sendEmail } from "../../utils/sendEmail";
import { v4 } from "uuid";
import { confirmAccount } from "../../utils/constants";
import { expire, set } from "../../redis/redis";

@Resolver()
export class RegisterResolver {
  @Mutation(() => Boolean)
  async register(
    @Arg("data") { email, password, username }: RegisterUserInput
  ): Promise<boolean> {
    //check if username is already in use
    let foundUser = await User.findOne({ where: { username } });
    if (foundUser) throw new Error("El nombre de usuario ya está en uso");

    //check if email is already in use
    foundUser = await User.findOne({ where: { email } });
    if (foundUser) throw new Error("El correo electrónico ya está registrado");

    //hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    //create user
    let user;
    try {
      user = await User.create({
        username,
        email,
        password: hashedPassword,
      }).save();
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }

    //generate token for account activation
    const token = v4();

    //save token in redis
    await set(confirmAccount + token, user.id.toString());
    await expire(user.id.toString(), 60 * 60 * 24);

    //sendEmail
    await sendEmail(email, token, "confirm");

    return true;

    // //create refresh token
    // const refreshToken = generateRefreshToken(user);

    // //save refresh token in redis
    // await setRedisAsync(refreshToken, refreshToken);
    // await expireRedisAsync(refreshToken, 60 * 60 * 24 * 7);

    // //generate cookie with refresh token
    // generateCookie("rtk", res, refreshToken);

    // //generate access token
    // const accessToken = generateAccessToken(user);

    // //extract expire property from access token
    // const { exp } = jwt.verify(
    //   accessToken,
    //   process.env.ACCESS_TOKEN_SECRET!
    // ) as TokenPayload;

    // return {
    //   jwt: accessToken,
    //   exp,
    // };
  }
}
