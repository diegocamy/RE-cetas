import { Arg, Query } from "type-graphql";
import { User } from "../../entities/User";

export class FindUserByUsernameResolver {
  @Query(() => User, { nullable: true })
  async userByUsername(
    @Arg("username") username: string
  ): Promise<User | undefined> {
    return User.findOne({ where: { username } });
  }
}
