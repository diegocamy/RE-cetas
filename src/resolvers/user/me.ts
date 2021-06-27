import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entities/User";
import { MyContext } from "../../interfaces";
import { isAuth } from "../../middleware/isAuth";

@Resolver((of) => User)
export class Me {
  @Query((type) => User)
  @UseMiddleware(isAuth)
  async me(@Ctx() { payload }: MyContext): Promise<User | undefined> {
    if (!payload) throw new Error("Unauthorized");

    return await User.findOne(payload.userId);
  }
}
