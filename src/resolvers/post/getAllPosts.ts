import { Query, Resolver } from "type-graphql";
import { Post } from "../../entities/Post";

@Resolver(() => Post)
export class PostsResolver {
  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return await Post.find();
  }
}
