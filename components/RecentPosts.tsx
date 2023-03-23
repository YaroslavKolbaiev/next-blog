import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import { Post } from '../types/Posts';

type Props = {
  post: Post;
};

function RecentPosts({ post }: Props) {
  return (
    <div className="relative h-52">
      <div className="absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-full" style={{ backgroundImage: `url('${post.imageUrl}')` }} />
      <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-full" />
      <div className="flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full">
        <p className="text-white mb-4 text-shadow font-semibold text-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
        <p className="text-white mb-4 text-shadow font-semibold text-2xl text-center">{post.title}</p>
        <div className="flex items-center absolute bottom-5 w-full justify-center">
          <p className="inline align-middle text-white text-shadow ml-2 font-medium">{post.author}</p>
        </div>
      </div>
      <Link href={`/post/${post.slug}`}><span className="cursor-pointer absolute w-full h-full" /></Link>
    </div>
  );
}

export default RecentPosts;
