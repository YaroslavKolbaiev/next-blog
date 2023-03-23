import type { NextApiRequest, NextApiResponse } from 'next';
import { GraphQLClient, gql } from 'graphql-request';
import { v4 } from 'uuid';

type Data = {
  name: string
};

type Props = {
  createPost: { id: string }
};

const graphqlAPI = process.env.GRAPHQL_ENDPOINT_READ_WRIGHT || '';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const graphQLClient = new GraphQLClient((graphqlAPI), {
    headers: {
      authorization: `Bearer ${process.env.GRAPHQL_TOKEN}`,
    },
  });

  const {
    title,
    author,
    excerpt,
    imageUrl,
    text,
  } = req.body;

  const generatedSlug = v4();

  const query = gql`
    mutation CreatePost(
      $title: String!,
      $author: String!,
      $slug: String!,
      $excerpt: String!
      $content: String!
      $imageUrl: String!
    ) {
      createPost(data: {
        title: $title,
        author: $author,
        slug: $slug,
        excerpt: $excerpt,
        content: $content,
        imageUrl: $imageUrl,
      })
      {
        id
      }
    }
  `;

  const publishQuery = gql`
    mutation PublishPost($id: ID!) {
      publishPost(where: {id: $id}, to: PUBLISHED) {
        id
      }
    }
  `;

  const { createPost }: Props = await graphQLClient.request(query, {
    title,
    author,
    slug: generatedSlug,
    excerpt,
    content: text,
    imageUrl,
  });

  await graphQLClient.request(publishQuery, { id: createPost.id });

  res.status(201);
}
