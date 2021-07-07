import { Arg, ArgumentValidationError, Mutation, Resolver } from "type-graphql";
import { User } from "../../entities/User";
import bcrypt from "bcrypt";
import { RegisterUserInput } from "../../input-types/RegisterUserInput";
import { sendEmail } from "../../utils/sendEmail";
import { v4 } from "uuid";
import { confirmAccount } from "../../utils/constants";
import { expire, redisClient, set } from "../../redis/redis";
import { ValidationError } from "apollo-server-express";

@Resolver()
export class RegisterResolver {
  @Mutation(() => Boolean)
  async register(
    @Arg("data") { email, password, username }: RegisterUserInput
  ): Promise<boolean> {
    //check if username is already in use
    let foundUser = await User.findOne({ where: { username } });
    if (foundUser)
      throw new ArgumentValidationError([
        {
          property: "username",
          constraints: { username: "El nombre de usuario ya está en uso" },
        },
      ]);

    //check if email is already in use
    foundUser = await User.findOne({ where: { email } });
    if (foundUser)
      throw new ArgumentValidationError([
        {
          property: "email",
          constraints: { username: "El correo electrónico ya está registrado" },
        },
      ]);

    //hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    //create user
    let user;
    try {
      user = await User.create({
        username,
        email,
        password: hashedPassword,
        token_version: v4(),
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
    try {
      await sendEmail(email, token, "confirm");
    } catch (error) {
      //delete user and confirmation token
      await User.delete({ id: user.id });
      redisClient.del(confirmAccount + token);

      console.log(error);
      throw new Error(
        "Ha ocurrido un error al registrar tu cuenta, por favor, intentalo de nuevo mas tarde"
      );
    }

    return true;
  }
}
