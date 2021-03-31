import React, { FC, ReactElement } from "react";
import { useAppSelector } from "../Redux/hooks";
import { ITopic } from "../utils/types";

interface TopicProps {
  setTopicFilter: React.Dispatch<React.SetStateAction<ITopic | null>>;
  topicFilter: ITopic | null;
}
const Topics: FC<TopicProps> = ({
  setTopicFilter,
  topicFilter,
}: TopicProps): ReactElement => {
  const {
    topics: { topics: TopicList },
  } = useAppSelector((state) => state);

  const topicClicked = (topic: ITopic): void => {
    switch (true) {
      case topicFilter && topicFilter.id === topic.id:
        setTopicFilter(null);
        return;
      default:
        setTopicFilter(topic);
        return;
    }
  };

  return (
    <div className="w-full">
      <ul className="max-w-2xl mx-auto min-h-24 my-6 flex flex-wrap">
        {TopicList?.length >= 1 &&
          TopicList.map((topic, indx) => (
            <li
              key={indx}
              onClick={() => topicClicked(topic)}
              className={`relative cursor-pointer rounded-lg mr-2 mb-2 py-2 px-4 text-lg font-bold border-0 transition-transform ${
                topic?.bgColor ? topic.bgColor : "bg-gray-400"
              } ${topic?.textColor ? topic.textColor : "text-white"} ${
                topic && topicFilter && topicFilter.id === topic.id
                  ? "transform -translate-y-1"
                  : ""
              }`.trim()}
            >
              {topic.title}
            </li>
          ))}
      </ul>
    </div>
  );
};
export default Topics;
