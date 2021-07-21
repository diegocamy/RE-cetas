import DataLoader from "dataloader";
import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Loader } from "type-graphql-dataloader";
import { getRepository, In, Like } from "typeorm";
import { Post } from "../../entities/Post";
import { PostSearchInputType } from "../../input-types/PostSearchInput";
import { Like as PostLike } from "../../entities/Like";
import { groupBy, take } from "lodash";

@Resolver(() => Post)
export class PostsResolver {
  @Query(() => [Post])
  async posts(
    @Arg("data", { nullable: true })
    data: PostSearchInputType,
    @Arg("limit", { nullable: true }) limit: number
  ): Promise<Post[]> {
    if (data) {
      const { authorId, id, slug, title } = data;

      if (id) {
        return await Post.find({ where: { id }, take: limit });
      }

      if (slug) {
        return await Post.find({
          where: { slug: Like(`%${slug}%`) },
          take: limit,
        });
      }

      if (title) {
        return await Post.find({
          where: { title: Like(`%${title}%`) },
          take: limit,
        });
      }

      if (authorId) {
        return await Post.find({ where: { authorId }, take: limit });
      }
    }

    return await Post.find({ order: { created: "DESC" }, take: limit });
  }

  @FieldResolver()
  @Loader<number, PostLike[]>(async (ids, { context }) => {
    const likes = await getRepository(PostLike).find({
      where: { postId: In([...ids]) },
      relations: ["user"],
    });
    const likesByPostId = groupBy(likes, "postId");
    return ids.map((id) => likesByPostId[id] ?? []);
  })
  likes(@Root() root: Post) {
    return (dataloader: DataLoader<number, PostLike[]>) =>
      dataloader.load(root.id);
  }

  @FieldResolver()
  @Loader<number, number>(async (ids, { context }) => {
    const likes = await getRepository(PostLike).find({
      where: { postId: In([...ids]) },
      relations: ["user"],
    });
    const likesByPostId = groupBy(likes, "postId");
    return ids.map((id) => likesByPostId[id] ?? []).map((e) => e.length);
  })
  likeCount(@Root() root: Post) {
    return (dataloader: DataLoader<number, number>) => dataloader.load(root.id);
  }
}
