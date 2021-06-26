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
};

export type ChangePasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type CreatePostInput = {
  title: Scalars['String'];
  content: Scalars['String'];
  picture: Scalars['String'];
};

export type JwtPayload = {
  __typename?: 'JWTPayload';
  jwt: Scalars['String'];
  exp: Scalars['Int'];
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
  forgotPassword: Scalars['Boolean'];
  invalidateRefreshTokens: Scalars['Boolean'];
  login: JwtPayload;
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


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
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
  posts: Array<Post>;
  userByUsername?: Maybe<User>;
  protected: Scalars['String'];
  users: Array<User>;
};


export type QueryPostsArgs = {
  data?: Maybe<PostSearchInputType>;
};


export type QueryUserByUsernameArgs = {
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
  bio?: Maybe<Scalars['String']>;
  created: Scalars['Timestamp'];
  updated: Scalars['Timestamp'];
  posts: Array<Post>;
  likedPosts: Array<Like>;
  postCount: Scalars['Int'];
};

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'register'>
);


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