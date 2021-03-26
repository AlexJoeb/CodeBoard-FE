import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import userReducer from "./Slices/userSlice";
import postReducer from "./Slices/postSlice";
import topicReducer from "./Slices/topicSlice";
import commentReducer from "./Slices/commentSlice";

export const store = configureStore({
	reducer: {
		users: userReducer,
		posts: postReducer,
		topics: topicReducer,
		comments: commentReducer
	},
	middleware: [thunk, logger],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
