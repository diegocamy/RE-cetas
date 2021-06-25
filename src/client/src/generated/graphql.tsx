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

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'username' | 'id' | 'email' | 'bio' | 'created' | 'updated' | 'postCount'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'title' | 'content' | 'slug' | 'picture' | 'created' | 'updated' | 'likeCount'>
    )>, likedPosts: Array<(
      { __typename?: 'Like' }
      & { post: (
        { __typename?: 'Post' }
        & Pick<Post, 'id' | 'title' | 'content' | 'slug' | 'picture' | 'created' | 'updated'>
      ) }
    )> }
  )> }
);


export const GetUsersDocument = gql`
    query GetUsers {
  users {
    username
    id
    email
    bio
    created
    updated
    posts {
      id
      title
      content
      slug
      picture
      created
      updated
      likeCount
    }
    likedPosts {
      post {
        id
        title
        content
        slug
        picture
        created
        updated
      }
    }
    postCount
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;