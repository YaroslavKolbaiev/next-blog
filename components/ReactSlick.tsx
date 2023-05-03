import React from 'react';
import Carousel from 'react-multi-carousel';
import { Post } from '../types/Posts';
import 'react-multi-carousel/lib/styles.css';
import RecentPosts from './RecentPosts';

type Props = {
  recentPosts: Post[];
};

const responsive = {
  desktop: {
    breakpoint: { max: 4000, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

function ReactSlick({ recentPosts }: Props) {
  const customLeftArrow = (
    <div className="absolute left-0 text-center cursor-pointer bg-slate-500 rounded-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
    </div>
  );

  const customRightArrow = (
    <div className="absolute right-0 text-center cursor-pointer bg-slate-500 rounded-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
    </div>
  );
  return (
    <div className="mb-6 shadow-lg rounded-lg">
      <Carousel
        infinite
        customLeftArrow={customLeftArrow}
        customRightArrow={customRightArrow}
        responsive={responsive}
      >
        {recentPosts.map((post) => (
          <RecentPosts key={post.id} post={post} />
        ))}
      </Carousel>
    </div>
  );
}

export default ReactSlick;
