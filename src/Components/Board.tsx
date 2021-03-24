import React, { useState, ReactElement } from "react";
import { Posts, Users } from "../utils/vars";
import { ReactComponent as Like } from "../assets/like.svg";
import { ReactComponent as Comment } from "../assets/comment.svg";
import { ReactComponent as Send } from "../assets/send.svg";

const Board = (): ReactElement => {
  // Comment Functionality
  const [commentsOpen, setCommentsOpen] = useState<boolean>(false);
  const [commentInput, setCommentInput] = useState<string>("");
  const toggleOpenComments = () => setCommentsOpen(!commentsOpen);
  const handleComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // Misc Utility
  const parseTime = (time: number): string =>
    new Date(time).toISOString().split("T")[0].replace(/-/g, ".");

  return (
    <div>
      {Posts?.length > 0 &&
        Posts.map((post) => {
          const author = Users.filter((u) => u.id === post.author)[0];
          return (
            <div className="relative w-full">
              {/* Card Wrapper */}
              <div
                key={post.id}
                className="relative z-10 bg-white rounded-lg shadow-md w-full p-4 mt-8"
              >
                {/* User Profile Card */}
                <div className="absolute -top-7 left-4 flex items-center">
                  <div
                    className="w-10 h-10 bg-red-400 rounded-full shadow-lg"
                    style={{
                      backgroundImage: `url(${author.profile_image})`,
                      backgroundPosition: "center center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  >
                    <img
                      src={author.profile_image}
                      alt={`${author.username}'s profile picture`}
                      className="h-full w-full sr-only"
                    />
                  </div>
                  <div className="bg-white shadow-md ml-2 px-4 py-2 shadow-lg flex flex-col rounded-lg">
                    <p className="text-sm font-bold">{author.username}</p>
                    <p className="text-sm">{author.role}</p>
                  </div>
                </div>
                {/* Topic Colors & Date */}
                <div className="w-full mb-4 flex items-center justify-end">
                  <ul className="flex items-center">
                    {post.topics?.length > 0 &&
                      post.topics.map((t, i) => (
                        <li
                          className={`${
                            t.bgcolor ? t.bgcolor : "bg-gray-400"
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
                <p className="leading-5">
                  &nbsp;&nbsp;&nbsp;&nbsp;{post.content}
                </p>
                {/* Likes and Comments Counters */}
                <ul className="mt-4 flex items-center">
                  {/* Likes */}
                  <li className="flex items-center cursor-pointer">
                    <Like className="fill-current text-gray-300" />
                    <p className="leading-3 text-sm text-gray-600 ml-1">
                      {post.likes}
                    </p>
                  </li>
                  <li
                    className="flex items-center ml-2 cursor-pointer"
                    onClick={toggleOpenComments}
                  >
                    {/* Comments */}
                    <Comment className="fill-current text-gray-300" />
                    <p className="leading-3 text-sm text-gray-600 ml-1">
                      {post.comments?.length || 0}
                    </p>
                  </li>
                </ul>
              </div>
              <div
                style={{
                  maxHeight: commentsOpen ? "200vh" : "0px",
                  transition: "max-height 1s ease-in-out",
                }}
                className={`relative z-0 w-full overflow-y-hidden bottom-2 rounded-lg left-0 bg-white shadow-lg`}
              >
                <div className="p-4 pt-5">
                  <form onSubmit={handleComment}>
                    <div className="flex items-center relative ">
                      <label htmlFor="comment" className="sr-only">
                        New Comment
                      </label>
                      <input
                        type="text"
                        name="comment"
                        value={commentInput}
                        onChange={({ target: { value } }) =>
                          setCommentInput(value)
                        }
                        autoComplete="off"
                        id="comment"
                        className="shadow-sm focus:ring-blue-400 focus:border-blue-400 block sm:text-sm border-gray-200 rounded-lg shadow w-full"
                        placeholder="Leave a comment..."
                      />
                      <button
                        type="submit"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 border border-blue-400 bg-blue-400 text-white font-bold p-2 rounded-full fill-current text-white"
                      >
                        <Send />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Board;