import { Resolver, Arg, Ctx, Mutation, UseMiddleware } from "type-graphql";
import { Post } from "../../entities/Post";
import { User } from "../../entities/User";
import { CreatePostInput } from "../../input-types/CreatePostInput";
import { MyContext } from "../../interfaces";
import { isAuth } from "../../middleware/isAuth";
import { createSlug } from "../../utils/createSlug";

@Resolver()
export class CreatePostResolver {
  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("data") { content, picture, title, time }: CreatePostInput,
    @Ctx() { payload }: MyContext
  ) {
    const userId = payload?.userId;

    const loggedUser = await User.findOne({ where: { id: userId } });

    const slug = createSlug(title);

    const post = await Post.create({
      author: loggedUser,
      time,
      title,
      content,
      picture,
      slug,
    }).save();

    return post;
  }
}
