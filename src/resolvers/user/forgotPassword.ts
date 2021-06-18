import { Resolver, Mutation, Arg } from "type-graphql";
import { v4 } from "uuid";
import { User } from "../../entities/User";
import { expireRedisAsync, setRedisAsync } from "../../server";
import { forgotPassword } from "../../utils/constants";
import { sendEmail } from "../../utils/sendEmail";

@Resolver()
export class ForgotPasswordMutation {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return false;
    }

    //generate token
    const token = v4();

    //save token in redis
    await setRedisAsync(forgotPassword + token, user.id.toString());
    await expireRedisAsync(forgotPassword + token, 60 * 60); //1hour

    //send email
    sendEmail(user.email, token, "forgot-password");

    return true;
  }
}
