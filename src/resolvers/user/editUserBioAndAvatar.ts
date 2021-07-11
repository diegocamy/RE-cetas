import { AuthenticationError } from "apollo-server-express";
import { GraphQLError } from "graphql";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entities/User";
import { EditUserBioAndAvatarInput } from "../../input-types/EditUserBioAndAvatarInput";
import { MyContext } from "../../interfaces";
import { isAuth } from "../../middleware/isAuth";

@Resolver()
export class EditUserBioAndAvatarResolver {
  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async editUserBioAndAvatar(
    @Ctx() { payload }: MyContext,
    @Arg("data") { avatar, bio }: EditUserBioAndAvatarInput
  ) {
    if (!payload) throw new AuthenticationError("Not Authorized");

    const user = await User.findOne({ where: { id: payload.userId } });

    if (!user) throw new GraphQLError("El usuario no existe");

    user.avatar = avatar;
    user.bio = bio;

    await user.save();

    return user;
  }
}
