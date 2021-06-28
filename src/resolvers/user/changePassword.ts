import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { User } from "../../entities/User";
import { ChangePasswordInput } from "../../input-types/ChangePasswordInput";
import { JWTPayload } from "../../object-types/JWTPayload";
import { forgotPassword } from "../../utils/constants";
import bcrypt from "bcrypt";
import { userSignIn } from "../../utils/userSignIn";
import { MyContext } from "../../interfaces";
import { get } from "../../redis/redis";

@Resolver()
export class ChangePassword {
  @Mutation(() => JWTPayload, { nullable: true })
  async changePassword(
    @Arg("data") { password, token }: ChangePasswordInput,
    @Ctx() { res }: MyContext
  ): Promise<JWTPayload | null> {
    //check if token exists
    const userId = await get(forgotPassword + token);

    if (!userId) {
      return null;
    }

    const user = await User.findOne(userId.toString());

    if (!user) {
      return null;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user.password = hashedPassword;

    await user.save();

    //sign user in

    let accessToken: JWTPayload;

    try {
      accessToken = await userSignIn(user, res);
    } catch (error) {
      throw new Error(error.message);
    }

    return {
      jwt: accessToken.jwt,
      exp: accessToken.exp,
      user,
    };
  }
}
