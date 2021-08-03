import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type ChangePasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type CreatePostInput = {
  title: Scalars['String'];
  content: Scalars['String'];
  picture: Scalars['String'];
  time: Scalars['String'];
};

export type EditUserBioAndAvatarInput = {
  bio?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
};

export type Follow = {
  __typename?: 'Follow';
  follower: User;
  following: User;
};

export type JwtPayload = {
  __typename?: 'JWTPayload';
  jwt: Scalars['String'];
  exp: Scalars['Int'];
  user: User;
};

export type Like = {
  __typename?: 'Like';
  post: Post;
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  DeletePost: Scalars['Boolean'];
  editPost: Post;
  likepost: Scalars['Boolean'];
  changePassword?: Maybe<JwtPayload>;
  confirmAccount?: Maybe<JwtPayload>;
  editUserBioAndAvatar: User;
  follow: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  imageUpload: Scalars['String'];
  invalidateRefreshTokens: Scalars['Boolean'];
  login: JwtPayload;
  logout: Scalars['Boolean'];
  register: Scalars['Boolean'];
};


export type MutationCreatePostArgs = {
  data: CreatePostInput;
};


export type MutationDeletePostArgs = {
  slug: Scalars['String'];
};


export type MutationEditPostArgs = {
  data: CreatePostInput;
  slug: Scalars['String'];
};


export type MutationLikepostArgs = {
  slug: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};


export type MutationConfirmAccountArgs = {
  token: Scalars['String'];
};


export type MutationEditUserBioAndAvatarArgs = {
  data: EditUserBioAndAvatarInput;
};


export type MutationFollowArgs = {
  username: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationImageUploadArgs = {
  image: Scalars['Upload'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  data: RegisterUserInput;
};

export type PasswordType = {
  password: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  title: Scalars['String'];
  content: Scalars['String'];
  slug: Scalars['String'];
  picture: Scalars['String'];
  time: Scalars['String'];
  created: Scalars['Timestamp'];
  updated: Scalars['Timestamp'];
  author: User;
  likes: Array<Like>;
  likeCount?: Maybe<Scalars['Int']>;
};

export type PostSearchInputType = {
  id?: Maybe<Scalars['ID']>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  authorId?: Maybe<Scalars['Float']>;
};

export type Query = {
  __typename?: 'Query';
  getPost?: Maybe<Post>;
  posts: Array<Post>;
  userByUsername?: Maybe<User>;
  getUser: User;
  me: User;
  protected: Scalars['String'];
  users: Array<User>;
};


export type QueryGetPostArgs = {
  slug: Scalars['String'];
};


export type QueryPostsArgs = {
  limit?: Maybe<Scalars['Float']>;
  data?: Maybe<PostSearchInputType>;
};


export type QueryUserByUsernameArgs = {
  username: Scalars['String'];
};


export type QueryGetUserArgs = {
  username: Scalars['String'];
};

export type RegisterUserInput = {
  password: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
};



export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  username: Scalars['String'];
  bio: Scalars['String'];
  avatar: Scalars['String'];
  created: Scalars['Timestamp'];
  updated: Scalars['Timestamp'];
  posts: Array<Post>;
  last4posts: Array<Post>;
  likedPosts: Array<Like>;
  postCount: Scalars['Int'];
  following: Array<Follow>;
  followers: Array<Follow>;
  followersCount: Scalars['Float'];
  followingCount: Scalars['Float'];
};

export type ChangePasswordMutationVariables = Exact<{
  password: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword?: Maybe<(
    { __typename?: 'JWTPayload' }
    & Pick<JwtPayload, 'jwt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ) }
  )> }
);

export type ConfirmAccountMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ConfirmAccountMutation = (
  { __typename?: 'Mutation' }
  & { confirmAccount?: Maybe<(
    { __typename?: 'JWTPayload' }
    & Pick<JwtPayload, 'jwt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ) }
  )> }
);

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String'];
  content: Scalars['String'];
  picture: Scalars['String'];
  time: Scalars['String'];
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'slug'>
  ) }
);

export type DeletePostMutationVariables = Exact<{
  slug: Scalars['String'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'DeletePost'>
);

export type EditPostMutationVariables = Exact<{
  slug: Scalars['String'];
  title: Scalars['String'];
  content: Scalars['String'];
  picture: Scalars['String'];
  time: Scalars['String'];
}>;


export type EditPostMutation = (
  { __typename?: 'Mutation' }
  & { editPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'slug'>
  ) }
);

export type EditUserDataMutationVariables = Exact<{
  bio: Scalars['String'];
  avatar: Scalars['String'];
}>;


export type EditUserDataMutation = (
  { __typename?: 'Mutation' }
  & { editUserBioAndAvatar: (
    { __typename?: 'User' }
    & Pick<User, 'bio' | 'avatar'>
  ) }
);

export type FollowMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type FollowMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'follow'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type GetPostQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetPostQuery = (
  { __typename?: 'Query' }
  & { getPost?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'title' | 'picture' | 'content' | 'likeCount' | 'created' | 'time'>
    & { likes: Array<(
      { __typename?: 'Like' }
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
      ) }
    )>, author: (
      { __typename?: 'User' }
      & Pick<User, 'username' | 'avatar'>
      & { followers: Array<(
        { __typename?: 'Follow' }
        & { follower: (
          { __typename?: 'User' }
          & Pick<User, 'username'>
        ) }
      )>, last4posts: Array<(
        { __typename?: 'Post' }
        & Pick<Post, 'title' | 'picture' | 'time' | 'slug'>
      )> }
    ) }
  )> }
);

export type GetPostByTitleQueryVariables = Exact<{
  title: Scalars['String'];
}>;


export type GetPostByTitleQuery = (
  { __typename?: 'Query' }
  & { posts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'title' | 'picture' | 'slug' | 'time'>
  )> }
);

export type GetUserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { getUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'bio' | 'avatar' | 'created' | 'followersCount' | 'followingCount' | 'postCount'>
    & { likedPosts: Array<(
      { __typename?: 'Like' }
      & { post: (
        { __typename?: 'Post' }
        & Pick<Post, 'title'>
      ) }
    )>, last4posts: Array<(
      { __typename?: 'Post' }
      & Pick<Post, 'title' | 'slug' | 'time' | 'picture'>
    )> }
  ) }
);

export type LikePostMutationVariables = Exact<{
  slug: Scalars['String'];
}>;


export type LikePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'likepost'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'JWTPayload' }
    & Pick<JwtPayload, 'jwt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ) }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email' | 'bio' | 'created' | 'avatar' | 'followingCount' | 'followersCount' | 'postCount'>
    & { likedPosts: Array<(
      { __typename?: 'Like' }
      & { post: (
        { __typename?: 'Post' }
        & Pick<Post, 'title'>
      ) }
    )>, last4posts: Array<(
      { __typename?: 'Post' }
      & Pick<Post, 'picture' | 'title' | 'time' | 'slug'>
    )> }
  ) }
);

export type MeFavoritesQueryVariables = Exact<{ [key: string]: never; }>;


export type MeFavoritesQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
    & { likedPosts: Array<(
      { __typename?: 'Like' }
      & { post: (
        { __typename?: 'Post' }
        & Pick<Post, 'slug' | 'picture' | 'time' | 'title'>
      ) }
    )> }
  ) }
);

export type MeFollowersQueryVariables = Exact<{ [key: string]: never; }>;


export type MeFollowersQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
    & { followers: Array<(
      { __typename?: 'Follow' }
      & { follower: (
        { __typename?: 'User' }
        & Pick<User, 'username' | 'bio' | 'avatar' | 'created' | 'postCount' | 'followingCount' | 'followersCount'>
      ) }
    )> }
  ) }
);

export type MeFollowingQueryVariables = Exact<{ [key: string]: never; }>;


export type MeFollowingQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
    & { following: Array<(
      { __typename?: 'Follow' }
      & { following: (
        { __typename?: 'User' }
        & Pick<User, 'username' | 'bio' | 'avatar' | 'created' | 'postCount' | 'followingCount' | 'followersCount'>
      ) }
    )> }
  ) }
);

export type MeRecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type MeRecipesQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & Pick<Post, 'slug' | 'title' | 'picture' | 'time'>
    )> }
  ) }
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'register'>
);

export type UploadImageMutationVariables = Exact<{
  image: Scalars['Upload'];
}>;


export type UploadImageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'imageUpload'>
);


export const ChangePasswordDocument = gql`
    mutation changePassword($password: String!, $token: String!) {
  changePassword(data: {password: $password, token: $token}) {
    jwt
    user {
      username
    }
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      password: // value for 'password'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ConfirmAccountDocument = gql`
    mutation ConfirmAccount($token: String!) {
  confirmAccount(token: $token) {
    jwt
    user {
      username
    }
  }
}
    `;
export type ConfirmAccountMutationFn = Apollo.MutationFunction<ConfirmAccountMutation, ConfirmAccountMutationVariables>;

/**
 * __useConfirmAccountMutation__
 *
 * To run a mutation, you first call `useConfirmAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmAccountMutation, { data, loading, error }] = useConfirmAccountMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useConfirmAccountMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmAccountMutation, ConfirmAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmAccountMutation, ConfirmAccountMutationVariables>(ConfirmAccountDocument, options);
      }
export type ConfirmAccountMutationHookResult = ReturnType<typeof useConfirmAccountMutation>;
export type ConfirmAccountMutationResult = Apollo.MutationResult<ConfirmAccountMutation>;
export type ConfirmAccountMutationOptions = Apollo.BaseMutationOptions<ConfirmAccountMutation, ConfirmAccountMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($title: String!, $content: String!, $picture: String!, $time: String!) {
  createPost(
    data: {title: $title, content: $content, picture: $picture, time: $time}
  ) {
    slug
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      picture: // value for 'picture'
 *      time: // value for 'time'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($slug: String!) {
  DeletePost(slug: $slug)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const EditPostDocument = gql`
    mutation EditPost($slug: String!, $title: String!, $content: String!, $picture: String!, $time: String!) {
  editPost(
    slug: $slug
    data: {title: $title, content: $content, picture: $picture, time: $time}
  ) {
    slug
  }
}
    `;
export type EditPostMutationFn = Apollo.MutationFunction<EditPostMutation, EditPostMutationVariables>;

/**
 * __useEditPostMutation__
 *
 * To run a mutation, you first call `useEditPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPostMutation, { data, loading, error }] = useEditPostMutation({
 *   variables: {
 *      slug: // value for 'slug'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      picture: // value for 'picture'
 *      time: // value for 'time'
 *   },
 * });
 */
export function useEditPostMutation(baseOptions?: Apollo.MutationHookOptions<EditPostMutation, EditPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditPostMutation, EditPostMutationVariables>(EditPostDocument, options);
      }
export type EditPostMutationHookResult = ReturnType<typeof useEditPostMutation>;
export type EditPostMutationResult = Apollo.MutationResult<EditPostMutation>;
export type EditPostMutationOptions = Apollo.BaseMutationOptions<EditPostMutation, EditPostMutationVariables>;
export const EditUserDataDocument = gql`
    mutation EditUserData($bio: String!, $avatar: String!) {
  editUserBioAndAvatar(data: {bio: $bio, avatar: $avatar}) {
    bio
    avatar
  }
}
    `;
export type EditUserDataMutationFn = Apollo.MutationFunction<EditUserDataMutation, EditUserDataMutationVariables>;

/**
 * __useEditUserDataMutation__
 *
 * To run a mutation, you first call `useEditUserDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserDataMutation, { data, loading, error }] = useEditUserDataMutation({
 *   variables: {
 *      bio: // value for 'bio'
 *      avatar: // value for 'avatar'
 *   },
 * });
 */
export function useEditUserDataMutation(baseOptions?: Apollo.MutationHookOptions<EditUserDataMutation, EditUserDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditUserDataMutation, EditUserDataMutationVariables>(EditUserDataDocument, options);
      }
export type EditUserDataMutationHookResult = ReturnType<typeof useEditUserDataMutation>;
export type EditUserDataMutationResult = Apollo.MutationResult<EditUserDataMutation>;
export type EditUserDataMutationOptions = Apollo.BaseMutationOptions<EditUserDataMutation, EditUserDataMutationVariables>;
export const FollowDocument = gql`
    mutation Follow($username: String!) {
  follow(username: $username)
}
    `;
export type FollowMutationFn = Apollo.MutationFunction<FollowMutation, FollowMutationVariables>;

/**
 * __useFollowMutation__
 *
 * To run a mutation, you first call `useFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followMutation, { data, loading, error }] = useFollowMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useFollowMutation(baseOptions?: Apollo.MutationHookOptions<FollowMutation, FollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowMutation, FollowMutationVariables>(FollowDocument, options);
      }
export type FollowMutationHookResult = ReturnType<typeof useFollowMutation>;
export type FollowMutationResult = Apollo.MutationResult<FollowMutation>;
export type FollowMutationOptions = Apollo.BaseMutationOptions<FollowMutation, FollowMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const GetPostDocument = gql`
    query GetPost($slug: String!) {
  getPost(slug: $slug) {
    title
    picture
    content
    likeCount
    created
    time
    likes {
      user {
        username
      }
    }
    author {
      username
      avatar
      followers {
        follower {
          username
        }
      }
      last4posts {
        title
        picture
        time
        slug
      }
    }
  }
}
    `;

/**
 * __useGetPostQuery__
 *
 * To run a query within a React component, call `useGetPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetPostQuery(baseOptions: Apollo.QueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
      }
export function useGetPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
        }
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>;
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>;
export type GetPostQueryResult = Apollo.QueryResult<GetPostQuery, GetPostQueryVariables>;
export const GetPostByTitleDocument = gql`
    query GetPostByTitle($title: String!) {
  posts(data: {title: $title}) {
    title
    picture
    slug
    time
  }
}
    `;

/**
 * __useGetPostByTitleQuery__
 *
 * To run a query within a React component, call `useGetPostByTitleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostByTitleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostByTitleQuery({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useGetPostByTitleQuery(baseOptions: Apollo.QueryHookOptions<GetPostByTitleQuery, GetPostByTitleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostByTitleQuery, GetPostByTitleQueryVariables>(GetPostByTitleDocument, options);
      }
export function useGetPostByTitleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostByTitleQuery, GetPostByTitleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostByTitleQuery, GetPostByTitleQueryVariables>(GetPostByTitleDocument, options);
        }
export type GetPostByTitleQueryHookResult = ReturnType<typeof useGetPostByTitleQuery>;
export type GetPostByTitleLazyQueryHookResult = ReturnType<typeof useGetPostByTitleLazyQuery>;
export type GetPostByTitleQueryResult = Apollo.QueryResult<GetPostByTitleQuery, GetPostByTitleQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($username: String!) {
  getUser(username: $username) {
    id
    username
    bio
    avatar
    created
    likedPosts {
      post {
        title
      }
    }
    followersCount
    followingCount
    last4posts {
      title
      slug
      time
      picture
    }
    postCount
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const LikePostDocument = gql`
    mutation LikePost($slug: String!) {
  likepost(slug: $slug)
}
    `;
export type LikePostMutationFn = Apollo.MutationFunction<LikePostMutation, LikePostMutationVariables>;

/**
 * __useLikePostMutation__
 *
 * To run a mutation, you first call `useLikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likePostMutation, { data, loading, error }] = useLikePostMutation({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useLikePostMutation(baseOptions?: Apollo.MutationHookOptions<LikePostMutation, LikePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikePostMutation, LikePostMutationVariables>(LikePostDocument, options);
      }
export type LikePostMutationHookResult = ReturnType<typeof useLikePostMutation>;
export type LikePostMutationResult = Apollo.MutationResult<LikePostMutation>;
export type LikePostMutationOptions = Apollo.BaseMutationOptions<LikePostMutation, LikePostMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    jwt
    user {
      username
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    email
    bio
    created
    avatar
    followingCount
    followersCount
    postCount
    likedPosts {
      post {
        title
      }
    }
    last4posts {
      picture
      title
      time
      slug
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MeFavoritesDocument = gql`
    query MeFavorites {
  me {
    id
    likedPosts {
      post {
        slug
        picture
        time
        title
      }
    }
  }
}
    `;

/**
 * __useMeFavoritesQuery__
 *
 * To run a query within a React component, call `useMeFavoritesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeFavoritesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeFavoritesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeFavoritesQuery(baseOptions?: Apollo.QueryHookOptions<MeFavoritesQuery, MeFavoritesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeFavoritesQuery, MeFavoritesQueryVariables>(MeFavoritesDocument, options);
      }
export function useMeFavoritesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeFavoritesQuery, MeFavoritesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeFavoritesQuery, MeFavoritesQueryVariables>(MeFavoritesDocument, options);
        }
export type MeFavoritesQueryHookResult = ReturnType<typeof useMeFavoritesQuery>;
export type MeFavoritesLazyQueryHookResult = ReturnType<typeof useMeFavoritesLazyQuery>;
export type MeFavoritesQueryResult = Apollo.QueryResult<MeFavoritesQuery, MeFavoritesQueryVariables>;
export const MeFollowersDocument = gql`
    query MeFollowers {
  me {
    id
    followers {
      follower {
        username
        bio
        avatar
        created
        postCount
        followingCount
        followersCount
      }
    }
  }
}
    `;

/**
 * __useMeFollowersQuery__
 *
 * To run a query within a React component, call `useMeFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeFollowersQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeFollowersQuery(baseOptions?: Apollo.QueryHookOptions<MeFollowersQuery, MeFollowersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeFollowersQuery, MeFollowersQueryVariables>(MeFollowersDocument, options);
      }
export function useMeFollowersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeFollowersQuery, MeFollowersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeFollowersQuery, MeFollowersQueryVariables>(MeFollowersDocument, options);
        }
export type MeFollowersQueryHookResult = ReturnType<typeof useMeFollowersQuery>;
export type MeFollowersLazyQueryHookResult = ReturnType<typeof useMeFollowersLazyQuery>;
export type MeFollowersQueryResult = Apollo.QueryResult<MeFollowersQuery, MeFollowersQueryVariables>;
export const MeFollowingDocument = gql`
    query MeFollowing {
  me {
    id
    following {
      following {
        username
        bio
        avatar
        created
        postCount
        followingCount
        followersCount
      }
    }
  }
}
    `;

/**
 * __useMeFollowingQuery__
 *
 * To run a query within a React component, call `useMeFollowingQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeFollowingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeFollowingQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeFollowingQuery(baseOptions?: Apollo.QueryHookOptions<MeFollowingQuery, MeFollowingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeFollowingQuery, MeFollowingQueryVariables>(MeFollowingDocument, options);
      }
export function useMeFollowingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeFollowingQuery, MeFollowingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeFollowingQuery, MeFollowingQueryVariables>(MeFollowingDocument, options);
        }
export type MeFollowingQueryHookResult = ReturnType<typeof useMeFollowingQuery>;
export type MeFollowingLazyQueryHookResult = ReturnType<typeof useMeFollowingLazyQuery>;
export type MeFollowingQueryResult = Apollo.QueryResult<MeFollowingQuery, MeFollowingQueryVariables>;
export const MeRecipesDocument = gql`
    query MeRecipes {
  me {
    id
    posts {
      slug
      title
      picture
      time
    }
  }
}
    `;

/**
 * __useMeRecipesQuery__
 *
 * To run a query within a React component, call `useMeRecipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeRecipesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeRecipesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeRecipesQuery(baseOptions?: Apollo.QueryHookOptions<MeRecipesQuery, MeRecipesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeRecipesQuery, MeRecipesQueryVariables>(MeRecipesDocument, options);
      }
export function useMeRecipesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeRecipesQuery, MeRecipesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeRecipesQuery, MeRecipesQueryVariables>(MeRecipesDocument, options);
        }
export type MeRecipesQueryHookResult = ReturnType<typeof useMeRecipesQuery>;
export type MeRecipesLazyQueryHookResult = ReturnType<typeof useMeRecipesLazyQuery>;
export type MeRecipesQueryResult = Apollo.QueryResult<MeRecipesQuery, MeRecipesQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $username: String!) {
  register(data: {email: $email, password: $password, username: $username})
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UploadImageDocument = gql`
    mutation UploadImage($image: Upload!) {
  imageUpload(image: $image)
}
    `;
export type UploadImageMutationFn = Apollo.MutationFunction<UploadImageMutation, UploadImageMutationVariables>;

/**
 * __useUploadImageMutation__
 *
 * To run a mutation, you first call `useUploadImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadImageMutation, { data, loading, error }] = useUploadImageMutation({
 *   variables: {
 *      image: // value for 'image'
 *   },
 * });
 */
export function useUploadImageMutation(baseOptions?: Apollo.MutationHookOptions<UploadImageMutation, UploadImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadImageMutation, UploadImageMutationVariables>(UploadImageDocument, options);
      }
export type UploadImageMutationHookResult = ReturnType<typeof useUploadImageMutation>;
export type UploadImageMutationResult = Apollo.MutationResult<UploadImageMutation>;
export type UploadImageMutationOptions = Apollo.BaseMutationOptions<UploadImageMutation, UploadImageMutationVariables>;