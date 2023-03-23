import React, { useContext, useState } from 'react';
import {
  PostComments,
  CommentsForm,
  PostDetailComponent,
  PostsError,
} from '../../components';
import { UserContext } from '../../Context/UserContext';
import { getComments, getPostDetails, getPosts } from '../../services/graphql';
import { Comments } from '../../types/Comments';
import { Post } from '../../types/Posts';

type Props = {
  post: Post;
  comments: Comments[];
  error: string;
};

function PostDetail({ post, comments, error }: Props) {
  const { user } = useContext(UserContext);
  const [visibleComments, setVisibleComments] = useState(comments);

  if (error) {
    return <PostsError />;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <PostDetailComponent post={post} />
      {user && <CommentsForm slug={post?.slug} setVisibleComments={setVisibleComments} />}
      <PostComments comments={visibleComments} setVisibleComments={setVisibleComments} />
    </div>
  );
}

export default PostDetail;

export async function getStaticProps(context: any) {
  const {
    params: { slug },
  } = context;

  try {
    const post = await getPostDetails(slug);
    const comments = await getComments(slug);

    if (!post) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        post,
        comments,
      },
    };
  } catch (error: any) {
    return {
      props: {
        error: error.message,
      },
    };
  }
}

export async function getStaticPaths() {
  try {
    const posts = await getPosts();

    const pathParams = posts.map((post: Post) => ({
      params: {
        slug: post.slug,
      },
    }));

    return {
      paths: pathParams,
      fallback: true,
    };
  } catch (error) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}
