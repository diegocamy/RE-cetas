import { Arg, Query, Resolver } from "type-graphql";
import { User } from "../../entities/User";

@Resolver()
export class FindUserByUsernameResolver {
  @Query(() => User, { nullable: true })
  async userByUsername(
    @Arg("username") username: string
  ): Promise<User | undefined> {
    return User.findOne({ where: { username } });
  }
}
