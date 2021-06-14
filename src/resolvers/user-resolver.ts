import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import { RegisterUserInput } from "../input-types/RegisterUserInput";
import { MyContext } from "../interfaces";
import jwt from "jsonwebtoken";

@ObjectType()
class UserLoginType {
  @Field()
  accessToken!: string;
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return User.find();
  }

  @Query(() => User, { nullable: true })
  async userByUsername(
    @Arg("username") username: string
  ): Promise<User | undefined> {
    return User.findOne({ where: { username } });
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("data") { email, password, username }: RegisterUserInput
  ): Promise<boolean> {
    //check if username is already in use
    let foundUser = await User.findOne({ where: { username } });
    if (foundUser) throw new Error("El nombre de usuario ya está en uso");

    //check if email is already in use
    foundUser = await User.findOne({ where: { email } });
    if (foundUser) throw new Error("El correo electrónico ya está registrado");

    //hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    //create user
    try {
      await User.create({
        username,
        email,
        password: hashedPassword,
      }).save();
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;
  }

  @Mutation(() => UserLoginType)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<UserLoginType> {
    //check for user with given email
    const foundUser = await User.findOne({ where: { email } });

    if (!foundUser) throw new Error("Correo o contraseña inválidos");

    //if there is an user with said email, compare the passwords
    const passwordsMatch = await bcrypt.compare(password, foundUser.password);

    if (!passwordsMatch) throw new Error("Correo o contraseña inválidos");

    //set refresh token
    res.cookie(
      "cid",
      jwt.sign({ userId: foundUser.id }, process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: "7d",
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      }
    );

    //return access token
    return {
      accessToken: jwt.sign(
        { userId: foundUser.id },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: "15m" }
      ),
    };
  }
}
