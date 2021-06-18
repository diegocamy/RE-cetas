import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../entities/User";
import bcrypt from "bcrypt";
import { MyContext, TokenPayload } from "../../interfaces";
import { generateCookie } from "../../utils/cookie";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import jwt from "jsonwebtoken";
import { expireRedisAsync, setRedisAsync } from "../../server";
import { JWTPayload } from "../../object-types/JWTPayload";
import { v4 } from "uuid";
import { sendEmail } from "../../utils/sendEmail";
import { confirmAccount } from "../../utils/constants";
import { userSignIn } from "../../utils/userSignIn";

@Resolver()
export class LoginResolver {
  @Mutation(() => JWTPayload)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<JWTPayload> {
    //check for user with given email
    const foundUser = await User.findOne({ where: { email } });

    if (!foundUser) throw new Error("Correo o contraseña inválidos");

    //if there is an user with said email, compare the passwords
    const passwordsMatch = await bcrypt.compare(password, foundUser.password);

    if (!passwordsMatch) throw new Error("Correo o contraseña inválidos");

    if (!foundUser.confirmed) {
      //send an email to confirm the account
      //generate token for account activation
      const token = v4();

      //save token in redis
      await setRedisAsync(confirmAccount + token, foundUser.id.toString());
      await expireRedisAsync(foundUser.id.toString(), 60 * 60 * 24);

      //sendEmail
      await sendEmail(email, token, "confirm");

      throw new Error(
        "Debes confirmar tu cuenta para iniciar sesión. Te hemos enviado un correo para que puedas hacerlo!"
      );
    }

    let accessToken: JWTPayload;

    try {
      accessToken = await userSignIn(foundUser, res);
    } catch (error) {
      throw new Error(error.message);
    }

    return {
      jwt: accessToken.jwt,
      exp: accessToken.exp,
    };
  }
}
