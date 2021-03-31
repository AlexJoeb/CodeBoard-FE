import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDType, ITopic } from "../../utils/types";
import { nanoid } from "nanoid";

interface ITopicState {
  topics: ITopic[];
  loading: boolean;
}

// Actions
const addTopic = createAction(
  "topics/ADD_TOPIC",
  (title: string, bgColor: string) => ({
    payload: {
      id: nanoid(),
      title,
      bgColor,
    },
  })
);
const initialState: ITopicState = {
  topics: [
    {
      id: 1,
      title: "JS",
      bgColor: "bg-yellow-400",
    },
    {
      id: 2,
      title: "React",
      bgColor: "bg-blue-400",
    },
    {
      id: 3,
      title: "Vue",
      bgColor: "bg-green-400",
    },
    {
      id: 4,
      title: "Angular",
      bgColor: "bg-red-600",
    },
    {
      id: 5,
      title: "Node",
      bgColor: "bg-purple-400",
    },
    {
      id: 6,
      title: "Tailwind",
      bgColor: "bg-indigo-400",
    },
  ],
  loading: false,
};

const slice = createSlice({
  name: "topics",
  initialState,
  reducers: {
    SET_TOPICS: (state, action: PayloadAction<ITopic[]>) => {
      return {
        ...state,
        topics: action.payload,
      };
    },
    REMOVE_TOPIC: (state, action: PayloadAction<IDType>) => {
      return {
        ...state,
        topics: state.topics.filter(
          (topic: ITopic) => topic.id !== action.payload
        ),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTopic, (state, action: PayloadAction<ITopic>) => {
      const { payload: topic } = action;
      const titleExists = state.topics.filter((t) => t.title === topic.title);
      if (titleExists) return state;
      return {
        ...state,
        topics: [...state.topics, topic],
      };
    });
  },
});
export const { SET_TOPICS, REMOVE_TOPIC } = slice.actions;

export default slice.reducer;
