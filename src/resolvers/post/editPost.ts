import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { v4 } from "uuid";
import { Post } from "../../entities/Post";
import { CreatePostInput } from "../../input-types/CreatePostInput";
import { MyContext } from "../../interfaces";
import { isAuth } from "../../middleware/isAuth";
import { createSlug } from "../../utils/createSlug";

@Resolver()
export class EditPostResolver {
  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async editPost(
    @Arg("slug") slug: string,
    @Arg("data") { content, picture, title }: CreatePostInput,
    @Ctx() { payload }: MyContext
  ) {
    if (!payload) throw new Error("Unauthorized");

    //get post from slug
    const post = await Post.findOne({ where: { slug }, loadRelationIds: true }); //loads author id into author property

    if (!post) throw new Error("La publicación no existe");

    const authorId = post.author as unknown as number;

    //check if user is post author
    if (payload.userId != authorId) throw new Error("Unauthorized");

    //update post
    post.content = content;
    post.picture = picture;
    post.title = title;

    //generate new slug
    const newSlug = createSlug(title);

    post.slug = newSlug;

    await post.save();

    return post;
  }
}
