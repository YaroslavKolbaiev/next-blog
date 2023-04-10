import Head from 'next/head';
import React from 'react';
import {
  Pagination,
  PostCard, PostsError, PostWidjet, ReactSlick,
} from '../components';
import { getAllPosts, getPosts, getRecentPosts } from '../services/graphql';
import { Post } from '../types/Posts';

type Props = {
  posts: Post[];
  recentPosts: Post[];
  error: string;
  allPosts: number
};

export default function Home({
  posts, recentPosts, error, allPosts,
}: Props) {
  if (error) {
    return <PostsError />;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Next Blog-App</title>
      </Head>
      <ReactSlick recentPosts={recentPosts} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.length ? (
            posts.map((post) => <PostCard key={post.slug} post={post} />)
          ) : (
            <p className="text-lg font-bold text-center">No Posts yet</p>
          )}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidjet recentPosts={recentPosts} />
          </div>
        </div>
      </div>
      <Pagination totalItems={allPosts} />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const page: string = context.query?.page || '1';
  try {
    const posts = await getPosts((+page - 1) * 3);
    const { recentPosts } = await getRecentPosts();
    const allPosts = await getAllPosts();

    return {
      props: {
        posts,
        recentPosts,
        allPosts,
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
