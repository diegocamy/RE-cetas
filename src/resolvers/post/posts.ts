import { Arg, Query, Resolver } from "type-graphql";
import { Like } from "typeorm";
import { Post } from "../../entities/Post";
import { PostSearchInputType } from "../../input-types/PostSearchInput";

@Resolver(() => Post)
export class PostsResolver {
  @Query(() => [Post])
  async posts(
    @Arg("data", { nullable: true })
    data: PostSearchInputType
  ): Promise<Post[]> {
    if (data) {
      const { authorId, id, slug, title } = data;

      if (id) {
        return await Post.find({ where: { id } });
      }

      if (slug) {
        return await Post.find({ slug: Like(`%${slug}%`) });
      }

      if (title) {
        return await Post.find({ title: Like(`%${title}%`) });
      }

      if (authorId) {
        return await Post.find({ where: { authorId } });
      }
    }

    return await Post.find({ order: { created: "DESC" } });
  }
}
