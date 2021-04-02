import React, { useState } from "react";
import { ReactComponent as SendIcon } from "../../assets/send.svg";
import { useAppSelector } from "../../Redux/hooks";
import { IComment } from "../../utils/types";

// Components
import Comment from "./Comment";

interface ICommentsProps {
  commentIds: (string | number)[];
  open: boolean;
}
const CommentSection = ({ commentIds, open }: ICommentsProps) => {
  const {
    comments: { comments: Comments },
  } = useAppSelector((state) => state);

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
        maxHeight: open ? "900vh" : "0px",
        transition: "max-height 1s ease-in-out",
      }}
      className={`relative z-0 w-full overflow-hidden bottom-2 rounded-lg left-0 bg-white shadow transition-all duration-1000`}
    >
      <div className="pt-6 px-4 pb-2 md:px-6">
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
          comments.map((comment, idx) => (
            <Comment key={idx} comment={comment} />
          ))}
      </div>
    </div>
  );
};

export default CommentSection;
