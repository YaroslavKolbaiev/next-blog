/* eslint-disable react/no-array-index-key */
import Image from 'next/image';
import React from 'react';
import moment from 'moment';
import { Post } from '../types/Posts';

type Props = {
  post: Post;
};

function PostDetailComponent({ post }: Props) {
  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      <div className="relative flex justify-center overflow-hidden mb-6">
        <Image
          src={post?.imageUrl}
          alt={post?.title}
          width={880}
          height={600}
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex flex-col md:flex-row md:justify-start items-center mb-8 w-full">
          <div className="flex items-center lg:mr-4">
            <p className="inline align-middle text-gray-700 ml-2 text-lg">
              {post?.author}
            </p>
          </div>
          <div className="font-medium text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline mr-2 text-pink-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="align-middle">
              {moment(post?.createdAt).format('MMM DD, YYYY')}
            </span>
          </div>
        </div>
        <h1 className="mb-8 text-3xl font-semibold">{post?.title}</h1>
        <p>{post?.content}</p>
      </div>
    </div>
  );
}

export default PostDetailComponent;
