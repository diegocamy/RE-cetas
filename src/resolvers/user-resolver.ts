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
import { generateCookie } from "../utils/cookie";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

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
    @Arg("data") { email, password, username }: RegisterUserInput,
    @Ctx() { res }: MyContext
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
    let user;
    try {
      user = await User.create({
        username,
        email,
        password: hashedPassword,
      }).save();
    } catch (error) {
      console.log(error);
      return false;
    }

    //set refresh token
    generateCookie("rtk", res, generateRefreshToken(user));

    //set access token
    generateCookie("atk", res, generateAccessToken(user));

    return true;
  }

  @Mutation(() => Boolean)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<boolean> {
    //check for user with given email
    const foundUser = await User.findOne({ where: { email } });

    if (!foundUser) throw new Error("Correo o contraseña inválidos");

    //if there is an user with said email, compare the passwords
    const passwordsMatch = await bcrypt.compare(password, foundUser.password);

    if (!passwordsMatch) throw new Error("Correo o contraseña inválidos");

    //set refresh token
    generateCookie("rtk", res, generateRefreshToken(foundUser));

    //set access token
    generateCookie("atk", res, generateAccessToken(foundUser));

    return true;
  }
}
