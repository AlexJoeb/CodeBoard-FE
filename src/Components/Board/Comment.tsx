import React from "react";
import { useAppSelector } from "../../Redux/hooks";
import { IComment } from "../../utils/types";
import { ReactComponent as LikeLogo } from "../../assets/like.svg";

interface ICommentProps {
  comment: IComment;
}
const Comment = ({ comment }: ICommentProps) => {
  const {
    users: { users: Users },
  } = useAppSelector((state) => state);
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
        <img
          src={author?.profile_image}
          alt={`${author?.username}`}
          className="h-full w-full sr-only"
        />
      </div>
      <div className="flex flex-col">
        <div className="w-full rounded-lg shadow-md bg-gray-100 p-4">
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

export default Comment;
