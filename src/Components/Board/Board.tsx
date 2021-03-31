import React, { FC, ReactElement } from "react";

// Utils and TS Vars
import { IPost } from "../../utils/types";

// Components
import Post from "./Post";

interface BoardProps {
  posts: IPost[];
}

const Board: FC<BoardProps> = ({ posts }: BoardProps): ReactElement => {
  return (
    <div>
      {posts?.length > 0 &&
        posts.map((post) => <Post key={post.id} post={post} />)}
    </div>
  );
};

export default Board;
