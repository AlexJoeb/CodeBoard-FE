import React, { FC, ReactElement } from "react";

import Board from "../Components/Board/Board";
import Stats from "../Components/Stats";
import Topics from "../Components/Topics";
import { useAppSelector } from "../Redux/hooks";
import { IPost, ITopic } from "../utils/types";

const Home: FC = (): ReactElement => {
  const {
    posts: { posts: Posts },
  } = useAppSelector((state) => state);

  // const [topicFilter, setTopicFilter] = React.useState<ITopic | null>(null);
  const [topicFilter, setTopicFilter] = React.useState<ITopic | null>({
    id: 1,
    title: "JS",
    bgColor: "bg-yellow-400",
  });
  const [displayPosts, setDisplayPosts] = React.useState<IPost[]>(Posts);

  React.useEffect(() => setDisplayPosts(Posts), [Posts]);
  React.useEffect(() => {
    if (!topicFilter) setDisplayPosts(Posts);
    else
      setDisplayPosts(
        Posts.filter((post) =>
          post.topics.map((topic) => topic.id).includes(topicFilter.id)
        )
      );
  }, [topicFilter]);

  return (
    <div className="w-full">
      <Stats />
      <Topics topicFilter={topicFilter} setTopicFilter={setTopicFilter} />
      <Board posts={displayPosts} />
    </div>
  );
};

export default Home;
