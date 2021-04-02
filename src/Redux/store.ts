import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
// import logger from "redux-logger";
import authReducer from "./Slices/authSlice";
import usersReducer from "./Slices/usersSlice";
import postReducer from "./Slices/postSlice";
import topicReducer from "./Slices/topicSlice";
import commentReducer from "./Slices/commentSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postReducer,
    topics: topicReducer,
    comments: commentReducer,
    auth: authReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
