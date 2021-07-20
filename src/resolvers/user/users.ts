import DataLoader from "dataloader";
import { groupBy } from "lodash";
import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Loader } from "type-graphql-dataloader";
import { getRepository, In } from "typeorm";
import { Follow } from "../../entities/Follow";
import { Like } from "../../entities/Like";
import { Post } from "../../entities/Post";
import { User } from "../../entities/User";

@Resolver((of) => User)
export class UsersResolver {
  @Query(() => [User])
  async users(@Arg("limitFollowers") limitFollowers: number): Promise<User[]> {
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

  @FieldResolver()
  @Loader<number, Like[]>(async (ids, { context }) => {
    const likes = await getRepository(Like).find({
      where: { userId: In([...ids]) },
      relations: ["post"],
    });
    const likesByUserId = groupBy(likes, "userId");
    return ids.map((id) => likesByUserId[id] ?? []);
  })
  likedPosts(@Root() root: User) {
    return (dataloader: DataLoader<number, Like[]>) => dataloader.load(root.id);
  }

  @FieldResolver()
  @Loader<number, Follow[]>(async (ids, { context }) => {
    const followers = await getRepository(Follow).find({
      where: { followingId: In([...ids]) },
      relations: ["follower"],
    });
    const followersById = groupBy(followers, "followingId");
    return ids.map((id) => followersById[id] ?? []);
  })
  followers(@Root() root: User, @Arg("limit") limit: number) {
    //TODO: LIMIT NUMBER OF FOLLOWERS
    return (dataloader: DataLoader<number, Follow[]>) =>
      dataloader.load(root.id);
  }

  @FieldResolver()
  @Loader<number, Follow[]>(async (ids, { context }) => {
    const followers = await getRepository(Follow).find({
      where: { followerId: In([...ids]) },
      relations: ["following"],
    });
    const followersById = groupBy(followers, "followerId");
    return ids.map((id) => followersById[id] ?? []);
  })
  following(@Root() root: User) {
    return (dataloader: DataLoader<number, Follow[]>) =>
      dataloader.load(root.id);
  }

  @FieldResolver()
  @Loader<number, number>(async (ids, { context }) => {
    const followers = await getRepository(Follow).find({
      where: { followingId: In([...ids]) },
      relations: ["follower"],
    });
    const followersById = groupBy(followers, "followingId");
    return ids.map((id) => followersById[id] ?? []).map((e) => e.length);
  })
  followersCount(@Root() root: User) {
    return (dataloader: DataLoader<number, number>) => dataloader.load(root.id);
  }

  @FieldResolver()
  @Loader<number, number>(async (ids, { context }) => {
    const followers = await getRepository(Follow).find({
      where: { followerId: In([...ids]) },
      relations: ["following"],
    });
    const followersById = groupBy(followers, "followerId");
    return ids.map((id) => followersById[id] ?? []).map((e) => e.length);
  })
  followingCount(@Root() root: User) {
    return (dataloader: DataLoader<number, number>) => dataloader.load(root.id);
  }

  @FieldResolver()
  @Loader<number, number>(async (ids, { context }) => {
    const posts = await getRepository(Post).find({
      where: { author: { id: In([...ids]) } },
    });
    const postsByUserId = groupBy(posts, "authorId");
    return ids.map((id) => postsByUserId[id] ?? []).map((e) => e.length);
  })
  postCount(@Root() root: User) {
    return (dataloader: DataLoader<number, number>) => dataloader.load(root.id);
  }
}
