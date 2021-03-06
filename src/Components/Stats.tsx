import React, { ReactElement } from "react";
import { useAppSelector } from "../Redux/hooks";

export default function Stats(): ReactElement {
  const {
    users: { users },
    posts: { posts },
    comments: { comments },
  } = useAppSelector((state) => state);

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full max-w-2xl h-24 rounded bg-white shadow-md grid grid-cols-3 grid-rows-1">
        <div className="flex justify-center items-center flex-col ">
          <p className="text-center font-bold text-blue-navy">
            {posts.length}
            <br />
            <span>POSTS</span>
          </p>
        </div>
        <div className="flex justify-center items-center flex-col border-l-2 border-r-2 border-black border-opacity-5">
          <p className="text-center font-bold text-blue-navy">
            {comments.length}
            <br />
            <span>COMMENTS</span>
          </p>
        </div>
        <div className="flex justify-center items-center flex-col ">
          <p className="text-center font-bold text-blue-navy">
            {users.length}
            <br />
            <span>USERS</span>
          </p>
        </div>
      </div>
    </div>
  );
}
