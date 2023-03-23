// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { GraphQLClient, gql } from 'graphql-request';

type Data = {
  name: string
};

type Props = {
  createComment: { id: string }
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

  if (req.method === 'DELETE') {
    const { id, slug } = req.body;

    const query = gql`
      mutation deleteComment($id: ID!) {
        deleteComment(where: {
          id: $id
        }) {
          id
        }
      }
    `;
    await graphQLClient.request(query, { id });

    res.revalidate(`/post/${slug}`);
    res.status(201);
    return;
  }

  const {
    email,
    comment,
    slug,
  } = req.body;

  const query = gql`
    mutation CreateComment($email: String!, $comment: String!, $slug: String!) {
      createComment(data: {email: $email, comment: $comment, slug: $slug}) { id }
    }
  `;

  const publishQuery = gql`
    mutation PublishComment($id: ID!) {
      publishComment(where: {id: $id}, to: PUBLISHED) {
        id
      }
    }
  `;

  const { createComment }: Props = await graphQLClient.request(query, {
    email, comment, slug,
  });

  await graphQLClient.request(publishQuery, { id: createComment.id });

  res.revalidate(`/post/${slug}`);
  res.status(201);
}
