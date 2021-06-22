import { Query, Resolver } from "type-graphql";
import { Post } from "../../entities/Post";

@Resolver(() => Post)
export class GetAllPostsResolver {
  @Query(() => [Post])
  async getAllPosts(): Promise<Post[]> {
    return await Post.find();
  }
}
