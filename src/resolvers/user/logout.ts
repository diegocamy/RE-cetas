import { Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../entities/User";
import { MyContext } from "../../interfaces";
import { JWTPayload } from "../../object-types/JWTPayload";

@Resolver((of) => User)
export class LogoutResolver {
  @Mutation(() => JWTPayload)
  async logout(@Ctx() { res }: MyContext) {
    res.clearCookie("rtk");

    return {
      exp: 0,
      jwt: "",
    };
  }
}
