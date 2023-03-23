import React, { useContext } from 'react';
import moment from 'moment';
import { Comments } from '../types/Comments';
import { deleteComment } from '../services/graphql';
import { UserContext } from '../Context/UserContext';

type Props = {
  comments: Comments[];
  setVisibleComments: (
    prev: Comments[] | ((value: Comments[]) => Comments[])
  ) => void;
};

function PostComments({ comments, setVisibleComments }: Props) {
  const { user } = useContext(UserContext);
  const onCommentDelete = (
    id: string | undefined,
    slug: string | undefined,
  ) => {
    try {
      deleteComment(id, slug);
      setVisibleComments((prev) => prev.filter((comment) => comment.id !== id));
    } catch (error) {
      alert('Error when deleting a comment');
    }
  };
  return (
    <div>
      {comments?.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            {comments?.length}
            {' '}
            Comments
          </h3>
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="border-b border-gray-100 mb-4 pb-4"
            >
              <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-4">
                <p>
                  <span className="font-semibold text-sm md:text-lg">
                    {comment?.email}
                  </span>
                  {' '}
                  on
                  {' '}
                  {moment(comment?.createdAt).format('MMM DD, YYYY')}
                </p>
                {user?.email === comment.email && (
                  <button
                    className="p-2 bg-red-700 text-white rounded-lg"
                    type="button"
                    onClick={() => onCommentDelete(comment.id, comment.slug)}
                  >
                    delete
                  </button>
                )}
              </div>
              <p className="whitespace-pre-line text-gray-600 w-full">
                {comment?.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostComments;
