import { Query, UseMiddleware, Ctx } from "type-graphql";
import { MyContext } from "../../interfaces";
import { isAuth } from "../../middleware/isAuth";

export class ProtectedResolver {
  @Query(() => String)
  @UseMiddleware(isAuth)
  protected(@Ctx() { payload }: MyContext) {
    return `Your user id is...${payload?.userId}`;
  }
}
