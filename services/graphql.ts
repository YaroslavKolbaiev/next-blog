import { gql, request } from 'graphql-request';
import { Comments } from '../types/Comments';
import { Post } from '../types/Posts';

const graphqlAPI = process.env.GRAPHQL_ENDPOINT_READ_ONLY || '';

type PostsProps = {
  posts: Post[];
};

type CommentsProps = {
  comments: Comments[]
};

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      posts {
        createdAt
        slug
        title
        author
        excerpt
        imageUrl
      }
    }
  `;

  const { posts }: PostsProps = await request(graphqlAPI, query);

  return posts;
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails {
      posts(orderBy: createdAt_ASC, last: 6) {
        id
        title
        imageUrl
        createdAt
        slug
      }
    }
  `;

  const { posts }: PostsProps = await request(graphqlAPI, query);

  return { recentPosts: posts };
};

export const getPostDetails = async (slug: string) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        title
        excerpt
        imageUrl
        author
        createdAt
        slug
        content
      }
    }
  `;

  const { post }: { post: Post } = await request(graphqlAPI, query, { slug });

  return post;
};

export const getComments = async (slug: string) => {
  const query = gql`
    query GetComments($slug: String!){
      comments(where: {slug: $slug}) {
        id
        email
        comment
        slug
        createdAt
      }
    }
  `;

  const { comments }: CommentsProps = await request(graphqlAPI, query, { slug });

  return comments;
};

export const submitComment = async (newComment: Comments) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newComment),
  });

  return result.json();
};

export const deleteComment = async (id: string | undefined, slug: string | undefined) => {
  const result = await fetch('/api/comments', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, slug }),
  });

  return result.json();
};

export const submitPost = async (newPost: Post) => {
  const { title, excerpt, imageUrl } = newPost;
  if (!title || !excerpt || !imageUrl) {
    return 'All Data required';
  }
  const result = await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  });

  return result.json();
};
