import React, { useState, ReactElement } from "react";
import { ReactComponent as LikeLogo } from "../assets/like.svg";
import { ReactComponent as CommentLogo } from "../assets/comment.svg";
import { ReactComponent as SendIcon } from "../assets/send.svg";
import { parseTime } from "../utils/utils";
import { IPost, IComment } from "../utils/types";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

const Board = (): ReactElement => {
  const { users: Users, posts: Posts } = useSelector(
    (state: RootState) => state
  );
  React.useEffect(() => {
    console.log("Users", Users);
  }, [Users]);
  return (
    <div>
      {Posts?.length > 0 &&
        Posts.map((post) => <Post key={post.id} post={post} />)}
    </div>
  );
};

interface IPostProps {
  post: IPost;
}
const Post = ({ post }: IPostProps) => {
  const { users: Users } = useSelector((state: RootState) => state);

  // Comment Functionality
  const [commentsOpen, setCommentsOpen] = useState<boolean>(false);
  const toggleOpenComments = () => setCommentsOpen(!commentsOpen);

  // Post Author
  const author = Users.filter((u) => u.id === post.author)[0];
  return (
    <div className="relative w-full">
      {/* Card Wrapper */}
      <div className="relative z-10 bg-white rounded-lg shadow-md w-full p-4 mt-8">
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
              alt={`${author?.username}'s profile image`}
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
        <p className="leading-5">&nbsp;&nbsp;&nbsp;&nbsp;{post.content}</p>
        <LikesAndComments post={post} toggleComments={toggleOpenComments} />
      </div>
      <CommentsSection commentIds={post.comments} open={commentsOpen} />
    </div>
  );
};

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

interface ICommentsProps {
  commentIds: (string | number)[];
  open: boolean;
}
const CommentsSection = ({ commentIds, open }: ICommentsProps) => {
  const { comments: Comments } = useSelector((state: RootState) => state);

  const [commentInput, setCommentInput] = useState<string>("");
  const handleComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const comments = commentIds.map(
    (id) => Comments.filter((c) => c.id === id)[0]
  ) as IComment[];

  return (
    <div
      style={{
        maxHeight: open ? "200vh" : "0px",
        transition: "max-height 1s ease-in-out",
      }}
      className={`relative z-0 w-full overflow-y-hidden bottom-2 rounded-lg left-0 bg-white shadow-lg`}
    >
      <div className="p-4 pt-5">
        <form onSubmit={handleComment} className="mb-4">
          <div className="flex items-center relative ">
            <label htmlFor="comment" className="sr-only">
              New Comment
            </label>
            <input
              type="text"
              name="comment"
              value={commentInput}
              onChange={({ target: { value } }) => setCommentInput(value)}
              autoComplete="off"
              id="comment"
              className="shadow-sm focus:ring-blue-400 focus:border-blue-400 block sm:text-sm border-gray-200 rounded-lg shadow w-full"
              placeholder="Leave a comment..."
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 border border-blue-400 bg-blue-400 text-white font-bold p-2 rounded-full fill-current text-white"
            >
              <SendIcon />
            </button>
          </div>
        </form>
        {comments?.length > 0 &&
          comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
      </div>
    </div>
  );
};

interface ICommentProps {
  comment: IComment;
}
const Comment = ({ comment }: ICommentProps) => {
  const { users: Users } = useSelector((state: RootState) => state);
  const author = Users.filter((user) => user.id === comment.author)[0];
  return (
    <div className="w-full grid grid-cols-comment grid-rows-1 gap-2 mb-4">
      <div
        className="w-8 h-8 rounded-full shadow-lg"
        style={{
          backgroundImage: `url(${author?.profile_image})`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <img src={author?.profile_image} className="h-full w-full sr-only" />
      </div>
      <div className="flex flex-col">
        <div className="w-full rounded-lg shadow-lg bg-gray-100 p-4">
          <p className="leading-5">{comment.content}</p>
        </div>
        <div className="flex items-center mt-2 cursor-pointer">
          <LikeLogo className="fill-current text-gray-300" />
          <p className="ml-2 text-gray-600">{comment.likes}</p>
        </div>
      </div>
    </div>
  );
};

export default Board;
