import DataLoader from "dataloader";
import { groupBy } from "lodash";
import { FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Loader } from "type-graphql-dataloader";
import { getRepository, In } from "typeorm";
import { Post } from "../../entities/Post";
import { User } from "../../entities/User";

@Resolver((of) => User)
export class UsersResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return User.find();
  }

  @FieldResolver()
  @Loader<number, Post[]>(async (ids, { context }) => {
    const posts = await getRepository(Post).find({
      where: { author: { id: In([...ids]) } },
    });
    const postsById = groupBy(posts, "authorId");
    return ids.map((id: number) => postsById[id] ?? []);
  })
  posts(@Root() root: User) {
    return (dataloader: DataLoader<number, Post[]>) => dataloader.load(root.id);
  }
}

/**
 *   @FieldResolver()
  @Loader<number, Photo[]>(async (ids, { context }) => {  // batchLoadFn
    const photos = await getRepository(Photo).find({
      where: { user: { id: In([...ids]) } },
    });
    const photosById = groupBy(photos, "userId");
    return ids.map((id) => photosById[id] ?? []);
  })
  photos(@Root() root: User) {
    return (dataloader: DataLoader<number, Photo[]>) =>
      dataloader.load(root.id);
  }
}
 */
