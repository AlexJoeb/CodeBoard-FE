import React from "react";
import { IPost } from "../../utils/types";
import { ReactComponent as LikeLogo } from "../../assets/like.svg";
import { ReactComponent as CommentLogo } from "../../assets/comment.svg";

interface ILikesCommentsProps {
  post: IPost;
  toggleComments: any;
}
const LikesAndComments = ({ post, toggleComments }: ILikesCommentsProps) => {
  return (
    <>
      {/* Likes and Comments Counters */}
      <ul className="mt-4 flex items-center">
        {/* Like Logo & Amount */}
        <li className="flex items-center cursor-pointer">
          <LikeLogo className="fill-current text-gray-300" />
          <p className="leading-3 text-sm text-gray-600 ml-1">{post.likes}</p>
        </li>
        <li
          className="flex items-center ml-2 cursor-pointer"
          onClick={toggleComments}
        >
          {/* Comment Logo & Amount */}
          <CommentLogo className="fill-current text-gray-300" />
          <p className="leading-3 text-sm text-gray-600 ml-1">
            {post.comments?.length || 0}
          </p>
        </li>
      </ul>
    </>
  );
};
export default LikesAndComments;
