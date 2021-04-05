import React, { FC, ReactElement } from "react";

// Utils and TS Vars
import { IPost, ITopic } from "../../utils/types";

// Components
import Post from "./Post";
import Pagination from "./Pagination";

interface BoardProps {
  posts: IPost[];
  topicFilter: ITopic | null;
}

const Board: FC<BoardProps> = ({
  posts = [],
  topicFilter,
}: BoardProps): ReactElement => {
  // Pagination
  // -- Page #
  const [page, setPage] = React.useState<number>(1);
  // -- Amount of posts per page
  const [postsPerPage] = React.useState<number>(5);

  React.useEffect(() => setPage(1), [topicFilter]);

  if (!posts || !posts.length) return <Spinner />;
  return (
    <div>
      <Pagination
        page={page}
        setPage={setPage}
        numberOfPages={Math.ceil(posts.length / postsPerPage)}
        maxToShow={5}
      />
      <div>
        {posts &&
          posts.length > 0 &&
          posts
            .slice((page - 1) * postsPerPage, page * postsPerPage)
            .map((post) => <Post key={post.id} post={post} />)}
      </div>
    </div>
  );
};

const Spinner = () => (
  <div className="w-full mt-8 flex justify-center items-center animate-spin">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <title>l-circle</title>
      <g fill="#111111">
        <path
          d="M16,32A16,16,0,1,1,32,16,16.019,16.019,0,0,1,16,32ZM16,4A12,12,0,1,0,28,16,12.013,12.013,0,0,0,16,4Z"
          fill="#111111"
          opacity="0.4"
        ></path>{" "}
        <path d="M32,16H28A12.013,12.013,0,0,0,16,4V0A16.019,16.019,0,0,1,32,16Z"></path>
      </g>
    </svg>
  </div>
);

export default Board;
