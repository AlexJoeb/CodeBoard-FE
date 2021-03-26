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
	middleware: [logger],
});


// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<AppDispatch>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
