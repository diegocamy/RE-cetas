import { Arg, Query, Resolver } from "type-graphql";
import { Post } from "../../entities/Post";

@Resolver((of) => Post)
export class GetPostResolver {
  @Query((of) => Post, { nullable: true })
  async getPost(@Arg("slug") slug: string): Promise<Post | null> {
    const post = await Post.findOne({ where: { slug } });

    if (!post) return null;

    return post;
  }
}
