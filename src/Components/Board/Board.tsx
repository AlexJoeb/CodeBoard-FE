import React, { FC, ReactElement } from "react";

// Utils and TS Vars
import { IPost } from "../../utils/types";

// Components
import Post from "./Post";
import Pagination from "./Pagination";

interface BoardProps {
  posts: IPost[];
}

const Board: FC<BoardProps> = ({ posts = [] }: BoardProps): ReactElement => {
  // Pagination
  // -- Page #
  const [page, setPage] = React.useState<number>(1);
  // -- Amount of posts per page
  const [postsPerPage] = React.useState<number>(5);
  React.useEffect(
    () =>
      console.log({
        page,
        posts,
        numOfPages: Math.ceil(posts.length / postsPerPage),
        beingShown: posts.slice(
          Math.floor(page / postsPerPage) * postsPerPage,
          Math.floor(page / postsPerPage) * postsPerPage >=
            Math.ceil(posts.length / postsPerPage)
            ? Math.ceil(posts.length / postsPerPage) - 1
            : (Math.floor(page / postsPerPage) + 1) * postsPerPage
        ),
      }),
    [page, posts]
  );
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
