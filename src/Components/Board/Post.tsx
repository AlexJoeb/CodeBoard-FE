import React, { useState } from "react";
import { useAppSelector } from "../../Redux/hooks";
import { IPost } from "../../utils/types";
import { parseTime } from "../../utils/utils";
import CommentSection from "./CommentSection";
import LikesAndComments from "./LikesAndComments";

interface IPostProps {
  post: IPost;
}
const Post = ({ post }: IPostProps) => {
  const {
    users: { users: Users },
  } = useAppSelector((state) => state);

  // Comment Functionality
  const [commentsOpen, setCommentsOpen] = useState<boolean>(false);
  const toggleOpenComments = () => setCommentsOpen(!commentsOpen);

  // Post Author
  const author = Users.filter((u) => u.id === post.author)[0];
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Card Wrapper */}
      <div className="relative z-10 bg-white rounded-lg shadow-md w-full p-4 mt-12">
        {/* User Profile Card */}
        <div className="absolute -top-7 left-4 flex items-center">
          <div
            className="w-10 h-10 bg-red-400 rounded-full shadow-lg"
            style={{
              backgroundImage: `url(${author?.profile_image})`,
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <img
              src={author?.profile_image}
              alt={`${author?.username}`}
              className="h-full w-full sr-only"
            />
          </div>
          <div className="bg-white shadow-md ml-2 px-4 py-2 shadow-lg flex flex-col rounded-lg">
            <p className="text-sm font-bold">{author?.username}</p>
            <p className="text-sm">{author?.role}</p>
          </div>
        </div>
        {/* Topic Colors & Date */}
        <div className="w-full mb-4 flex items-center justify-end">
          <ul className="flex items-center">
            {post.topics?.length > 0 &&
              post.topics.map((t, i) => (
                <li
                  key={i}
                  className={`${
                    t.bgColor ? t.bgColor : "bg-gray-400"
                  } h-2 w-2 rounded-full ml-1`}
                >
                  &nbsp;
                </li>
              ))}
          </ul>
          <p className="text-xs ml-2 text-gray-400 font-semibold">
            {parseTime(post.created_at)}
          </p>
        </div>
        {/* Content */}
        <p className="leading-5">&nbsp;&nbsp;&nbsp;&nbsp;{post.content}</p>
        <LikesAndComments post={post} toggleComments={toggleOpenComments} />
      </div>
      <CommentSection commentIds={post.comments} open={commentsOpen} />
    </div>
  );
};

export default Post;
