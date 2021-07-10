import { AuthenticationError } from "apollo-server-express";
import { GraphQLError } from "graphql";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Follow } from "../../entities/Follow";
import { User } from "../../entities/User";
import { MyContext } from "../../interfaces";
import { isAuth } from "../../middleware/isAuth";

@Resolver()
export class FollowResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async follow(
    @Ctx() { payload }: MyContext,
    @Arg("username") username: string
  ) {
    if (!payload) throw new AuthenticationError("Not authorized");

    const userToFollow = await User.findOne({ where: { username } });

    if (userToFollow?.id === payload.userId)
      throw new GraphQLError("No puedes seguirte a ti mismo");

    if (!userToFollow) throw new GraphQLError("No existe el usuario");

    //check if current user is already following
    const isFollowing = await Follow.findOne({
      where: { followerId: payload.userId, followingId: userToFollow.id },
    });

    if (isFollowing) {
      //unfollow
      await isFollowing.remove();
      return true;
    }

    //follow the user
    await Follow.create({
      followerId: payload.userId,
      followingId: userToFollow.id,
    }).save();

    return true;
  }
}
