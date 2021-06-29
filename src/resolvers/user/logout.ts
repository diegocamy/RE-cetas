import { Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../entities/User";
import { MyContext } from "../../interfaces";
import { generateCookie } from "../../utils/cookie";

@Resolver((of) => User)
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    generateCookie("rtk", res, "");

    return true;
  }
}
