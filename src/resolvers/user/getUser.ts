import { GraphQLError } from "graphql";
import { Arg, Query, Resolver } from "type-graphql";
import { User } from "../../entities/User";

@Resolver((of) => User)
export class GetUserResolver {
  @Query(() => User)
  async getUser(@Arg("username") username: string) {
    const user = await User.findOne({ where: { username } });

    if (!user) throw new GraphQLError("No existe el usuario");

    return user;
  }
}
