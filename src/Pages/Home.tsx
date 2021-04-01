import React, { FC, ReactElement } from "react";

import Board from "../Components/Board/Board";
import Pagination from "../Components/Board/Pagination";
import Stats from "../Components/Stats";
import Topics from "../Components/Topics";
import { useAppSelector } from "../Redux/hooks";
import { RootState } from "../Redux/store";
import { IPost, ITopic } from "../utils/types";

const Home: FC = (): ReactElement => {
  const {
    posts: { posts: Posts },
  } = useAppSelector((state: RootState) => state);

  const [topicFilter, setTopicFilter] = React.useState<ITopic | null>(null);
  const [postsAfterFilter, setPostsAfterFilter] = React.useState<IPost[]>(
    Posts
  );

  // Filter posts based on topicFilter;
  const filterPosts = () => {
    if (!topicFilter) setPostsAfterFilter(Posts);
    else
      setPostsAfterFilter(
        Posts.filter(
          (post: IPost) =>
            post.topics.filter((topic) => topic.id === topicFilter.id).length >
            0
        )
      );
  };
  // -- When Posts or TopicFilter changes, refilter.
  React.useEffect(() => filterPosts(), [topicFilter, Posts]);

  return (
    <div className="w-full">
      <Stats />
      <Topics topicFilter={topicFilter} setTopicFilter={setTopicFilter} />
      <Board posts={postsAfterFilter} />
    </div>
  );
};

export default Home;
