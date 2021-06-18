import { Query } from "type-graphql";
import { User } from "../../entities/User";

export class UsersResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return User.find();
  }
}
