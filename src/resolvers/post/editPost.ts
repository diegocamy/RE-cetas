import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
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
    @Arg("data") { content, picture, title, time }: CreatePostInput,
    @Ctx() { payload }: MyContext
  ) {
    if (!payload) throw new Error("Unauthorized");

    //get post from slug
    const post = await Post.findOne({ where: { slug } }); //loads author id into author property

    console.log(JSON.stringify(post));

    if (!post) throw new Error("La publicación no existe");

    const authorId = post.authorId;

    //check if user is post author
    if (payload.userId != authorId) throw new Error("Unauthorized");

    //update post
    post.content = content;
    post.picture = picture;
    post.title = title;
    post.time = time;

    //generate new slug if there's a new title
    if (title) {
      const newSlug = createSlug(title);
      post.slug = newSlug;
    }

    await post.save();

    return post;
  }
}
