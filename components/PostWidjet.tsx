import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '../types/Posts';

type Props = {
  recentPosts: Post[];
};

function PostWidjet({ recentPosts }: Props) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Recent Posts</h3>
      {recentPosts.length ? (
        recentPosts.map((post) => (
          <div key={post.id} className="flex items-center w-full mb-4">
            <Image
              alt={post.title}
              height={60}
              width={60}
              className="align-middle rounded-full w-12 h-12"
              src={post.imageUrl}
            />
            <div className="flex-grow ml-4">
              <p className="text-gray-500 font-xs">
                {moment(post.createdAt).format('MMM DD, YYYY')}
              </p>
              <Link href={`/post/${post.slug}`} className="text-md">
                {post.title}
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No Posts yet</p>
      )}
    </div>
  );
}

export default PostWidjet;
