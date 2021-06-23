import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Like } from "../../entities/Like";
import { Post } from "../../entities/Post";
import { MyContext } from "../../interfaces";
import { isAuth } from "../../middleware/isAuth";

@Resolver((of) => Post)
export class LikePostResolver {
  @Mutation()
  @UseMiddleware(isAuth)
  async likepost(
    @Ctx() { payload }: MyContext,
    @Arg("slug") slug: string
  ): Promise<boolean> {
    if (!payload) throw new Error("Unauthorized");

    const { userId } = payload;

    //get post by slug
    const post = await Post.findOne({ where: { slug } });

    if (!post) throw new Error("No existe la publicación");

    //check if user already liked the post
    const like = await Like.findOne({ where: { userId, postId: post.id } });

    //if user already liked the post, then remove the like
    if (like) {
      await like.remove();
      return true;
    }

    //add user like
    await Like.create({
      userId,
      postId: post.id,
    }).save();

    return true;
  }
}
