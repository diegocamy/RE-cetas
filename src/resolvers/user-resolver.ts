import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import bcrypt from "bcrypt";

@InputType()
class RegisterUserInput implements Partial<User> {
  @Field()
  username!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users() {
    return User.find();
  }

  @Mutation(() => User)
  async register(@Arg("data") data: RegisterUserInput) {
    const { email, password, username } = data;
    //hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    //create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    }).save();

    return user;
  }
}
