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

  return (
    <>
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
    </>
  );
};

export default Board;
