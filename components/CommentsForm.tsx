import React, {
  useContext, useState,
} from 'react';
import { UserContext } from '../Context/UserContext';
import { submitComment } from '../services/graphql';
import { Comments } from '../types/Comments';

type Props = {
  slug: string | undefined
  setVisibleComments: (prev: Comments[] | ((value: Comments[]) => Comments[])) => void
};

function CommentsForm({ slug, setVisibleComments }: Props) {
  const [comment, setComment] = useState('');
  const { user } = useContext(UserContext);

  const handleCommentSubmit = () => {
    if (!comment.length) {
      alert('Please provide your comment');
      return;
    }
    const newComment = {
      comment,
      email: user?.email,
      slug,
    };

    try {
      submitComment(newComment);
      setComment('');
      setVisibleComments((prev) => [...prev, newComment]);
    } catch (error) {
      alert('Error when creating a comment');
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Leave a Reply</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          className="
            p-4
            outline-none
            w-full
            rounded-lg
            h-40
            focus:ring-2
            focus:ring-gray-200
            bg-gray-100
            text-gray-700
          "
          name="comment"
          placeholder="Comment"
          value={comment}
          onChange={(e) => { setComment(e.target.value); }}
        />
      </div>
      <div className="mt-8">
        <button
          onClick={handleCommentSubmit}
          type="button"
          className="transition
          duration-500
          ease
          hover:bg-indigo-900
          inline-block
          bg-pink-600
          text-lg
          font-medium
          rounded-full
          text-white
          px-8
          py-3
          cursor-pointer
        "
        >
          Post Comment
        </button>
      </div>
    </div>
  );
}

export default CommentsForm;
