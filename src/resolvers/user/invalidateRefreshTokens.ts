import { Ctx, Mutation, UseMiddleware, Resolver } from "type-graphql";
import { v4 } from "uuid";
import { User } from "../../entities/User";
import { MyContext, TokenPayload } from "../../interfaces";
import { isAuth } from "../../middleware/isAuth";

@Resolver()
export class InvalidateRefreshTokensResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async invalidateRefreshTokens(@Ctx() { payload }: MyContext) {
    const { userId } = payload as TokenPayload;
    const user = await User.findOne({ where: { id: userId } });

    if (!user) return false;

    user.token_version = v4();
    await user.save();

    return true;
  }
}
