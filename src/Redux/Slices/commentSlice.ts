import { IComment, IDType } from "../../utils/types";
import { nanoid } from "nanoid";
import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { addCommentToPost } from "./postSlice";

interface ICommentState {
  comments: IComment[];
  loading: boolean;
}
const initialState: ICommentState = {
  comments: [],
  loading: false,
};

const updateComment = createAction(
  "comments/UPDATE_COMMENT",
  (id: string | number, updates: Partial<IComment>) => ({
    payload: { id, updates, updated_at: Date.now() },
  })
);

const slice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    SET_COMMENTS: (state, action: PayloadAction<IComment[]>) => ({
      ...state,
      comments: action.payload,
    }),
    ADD_COMMENT: {
      reducer: (state, action: PayloadAction<IComment>) => {
        state.comments.push(action.payload);
      },
      prepare: (author: IDType, post: IDType, content: string) => ({
        payload: {
          id: nanoid(),
          author,
          post,
          content,
          likes: 0,
          created_at: Date.now(),
          updated_at: Date.now(),
        },
      }),
    },
    REMOVE_COMMENT: (state, action: PayloadAction<number>) => ({
      ...state,
      comments: state.comments.filter((c) => c.id !== action.payload),
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(updateComment, (state, action) => {
      const { id, updates, updated_at } = action.payload;

      const comment = state.comments.filter((c) => c.id === id)[0];
      if (!comment) {
        // Comment does not exist - return state;
        return state;
      }

      // Extract the updates allowed to be made.
      // Content and likes are the only two fields allowed to be updated.
      // Scrub for those values, don't allow other fields to be updated.
      let finalUpdates: {
        content?: string;
        likes?: number;
        updated_at: number;
      } = {
        updated_at,
      };
      if ("content" in updates) finalUpdates["content"] = updates["content"];
      if ("likes" in updates) finalUpdates["likes"] = updates["likes"];

      return {
        ...state,
        comments: [
          ...state.comments.filter((c) => c.id !== id),
          {
            ...comment,
            ...finalUpdates,
          },
        ],
      };
    });
  },
});

export const { ADD_COMMENT, REMOVE_COMMENT, SET_COMMENTS } = slice.actions;

export const generateComments = createAsyncThunk(
  "comments/generate",
  (payload, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;
    const {
      users: { users: Users },
      posts: { posts: Posts },
    }: RootState = thunkAPI.getState() as RootState;

    // Amount of comments to create.
    const amount = Math.floor(Math.random() * 200) + 50;

    // Final list of comments.
    let List: IComment[] = [];

    const randomAuthor = (): IDType => {
      const id = Math.floor(Math.random() * (Users?.length - 1));
      return Users[id].id;
    };

    const randomPost = (): IDType => {
      const id = Math.floor(Math.random() * (Posts?.length - 1));
      return Posts[id].id;
    };

    for (let i = 0; i < amount; i++) {
      const id = nanoid();
      const author = randomAuthor();
      const post = randomPost();
      const likes = Math.floor(Math.random() * 1000) + 1;

      const comment: IComment = {
        id,
        author,
        post,
        content:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam.",
        likes,
        created_at: Date.now(),
        updated_at: Date.now(),
      };

      dispatch(addCommentToPost(post, id));
      List.push(comment);
    }
    dispatch(SET_COMMENTS(List));
    return List;
  }
);

export default slice.reducer;
