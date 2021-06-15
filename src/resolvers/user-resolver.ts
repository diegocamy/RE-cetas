import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import { RegisterUserInput } from "../input-types/RegisterUserInput";
import { MyContext, TokenPayload } from "../interfaces";
import { generateCookie } from "../utils/cookie";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { isAuth } from "../middleware/isAuth";
import jwt from "jsonwebtoken";
import { RefreshToken } from "../entities/RefreshToken";

@ObjectType()
class JWTPayload {
  @Field()
  jwt!: string;
  @Field(() => Int)
  exp!: number;
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return User.find();
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  protected(@Ctx() { payload }: MyContext) {
    return `Your user id is...${payload?.userId}`;
  }

  @Query(() => User, { nullable: true })
  async userByUsername(
    @Arg("username") username: string
  ): Promise<User | undefined> {
    return User.findOne({ where: { username } });
  }

  @Mutation(() => JWTPayload)
  async register(
    @Arg("data") { email, password, username }: RegisterUserInput,
    @Ctx() { res }: MyContext
  ): Promise<JWTPayload> {
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
      throw new Error(error.message);
    }

    //set refresh token
    const refreshToken = generateRefreshToken(user);

    //save refresh token in database
    try {
      await RefreshToken.create({
        refresh_token: refreshToken,
        user: user,
      }).save();
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }

    generateCookie("rtk", res, refreshToken);

    const token = generateAccessToken(user);
    const { exp } = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as TokenPayload;

    return {
      jwt: token,
      exp,
    };
  }

  @Mutation(() => JWTPayload)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<JWTPayload> {
    //check for user with given email
    const foundUser = await User.findOne({ where: { email } });

    if (!foundUser) throw new Error("Correo o contraseña inválidos");

    //if there is an user with said email, compare the passwords
    const passwordsMatch = await bcrypt.compare(password, foundUser.password);

    if (!passwordsMatch) throw new Error("Correo o contraseña inválidos");

    //set refresh token
    const refreshToken = generateRefreshToken(foundUser);

    //save refresh token in database
    try {
      await RefreshToken.create({
        refresh_token: refreshToken,
        user: foundUser,
      }).save();
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }

    generateCookie("rtk", res, refreshToken);

    const token = generateAccessToken(foundUser);
    const { exp } = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as TokenPayload;

    return {
      jwt: token,
      exp,
    };
  }
}
