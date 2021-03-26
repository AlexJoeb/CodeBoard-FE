import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { ITopic } from "../../utils/types";

const slice = createSlice({
	name: "topics",
	initialState: [
		{
			title: "JS",
			bgcolor: "bg-yellow-400"
		},
		{
			title: "React",
			bgcolor: "bg-blue-400"
		}, 
		{
			title: "Vue",
			bgcolor: "bg-green-400"
		},
		{
			title: "Angular",
			bgcolor: "bg-red-600"
		},
		{
			title: "Node",
			bgcolor: "bg-purple-400"
		},
		{
			title: "Tailwind",
			bgcolor: "bg-indigo-400"
		}
	] as ITopic[],
	reducers: {
		SET_TOPICS: (state, action: PayloadAction<ITopic[]>) => {
			return [];
		},
		ADD_TOPIC: (state, action: PayloadAction<ITopic>) => {
			return [...state, action.payload];
		},
		REMOVE_TOPIC: (state, action: PayloadAction<string>) => {
			return state.filter((topic: ITopic) => topic.title !== action.payload);
		}
	}
});

export const { SET_TOPICS, ADD_TOPIC, REMOVE_TOPIC } = slice.actions;

export const setPosts = (topics: ITopic[]): AppThunk => dispatch => {
	dispatch(SET_TOPICS(topics));
};

export const addTopic = (topic: ITopic): AppThunk => dispatch => {
	dispatch(ADD_TOPIC(topic));
};

export const removePostByTitle = (title: string): AppThunk => dispatch => {
	dispatch(REMOVE_TOPIC(title));
};

export default slice.reducer;
