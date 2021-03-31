import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { IDType, IPost, ITopic } from "../../utils/types";
import { nanoid } from "nanoid";
import { RootState } from "../store";

// TS Vars.
interface IPostState {
  posts: IPost[];
  loading: boolean;
}

const initialState: IPostState = {
  posts: [],
  loading: false,
};

export const updatePost = createAction(
  "posts/UPDATE_POST",
  (id: IDType, updates: Partial<IPost>) => {
    return {
      payload: {
        id,
        updates,
        updated_at: Date.now(),
      },
    };
  }
);
export const addCommentToPost = createAction(
  "posts/ADD_COMMENT",
  (postId: IDType, commentId: IDType) => {
    return {
      payload: {
        postId,
        commentId,
        updated_at: Date.now(),
      },
    };
  }
);
export const removeCommentFromPost = createAction(
  "posts/REMOVE_COMMENT",
  (postId: IDType, commentId: IDType) => {
    return {
      payload: {
        postId,
        commentId,
        updated_at: Date.now(),
      },
    };
  }
);

// Slice
const slice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    SET_POSTS: (state, action: PayloadAction<IPost[]>) => ({
      ...state,
      posts: action.payload,
    }),
    ADD_POST: {
      reducer: (state, action: PayloadAction<IPost>) => {
        state.posts.push(action.payload);
      },
      prepare: (
        author: string | number,
        content: string,
        topics: ITopic[]
      ) => ({
        payload: {
          id: nanoid(),
          author,
          content,
          likes: 0,
          comments: [],
          topics,
          created_at: Date.now(),
          updated_at: Date.now(),
        },
      }),
    },
    REMOVE_POST: (state, action: PayloadAction<IDType>) => ({
      ...state,
      posts: state.posts.filter((p) => p.id !== action.payload),
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePost, (state, action) => {
        const { id, updates, updated_at } = action.payload;

        const post = state.posts.filter((p) => p.id === id)[0];
        if (!post) {
          // Post does not exist - return state.
          return state;
        }

        // Extract the updates allowed to be made.
        // Content, likes, and topics are the only fields allowed to be updated.
        // Scrub for those values, don't allow other fields to be updated.
        let finalUpdates: {
          content?: string;
          likes?: number;
          topics?: ITopic[];
          updated_at: number;
        } = {
          updated_at,
        };
        if ("content" in updates) finalUpdates["content"] = updates["content"];
        if ("likes" in updates) finalUpdates["likes"] = updates["likes"];
        if ("topics" in updates) finalUpdates["topics"] = updates["topics"];

        return {
          ...state,
          comments: [
            ...state.posts.filter((p) => p.id !== id),
            {
              ...post,
              ...finalUpdates,
            },
          ],
        };
      })
      .addCase(addCommentToPost, (state, action) => {
        const { postId, commentId, updated_at } = action.payload;
        const post = state.posts.filter((p) => p.id === postId)[0];
        if (!post) {
          // Post does not exist - return state.
          return state;
        }

        const postIncludesComment = post.comments.includes(commentId);
        if (postIncludesComment) {
          // Comment already accounted for in post's comments array.
          return state;
        }

        return {
          ...state,
          posts: [
            ...state.posts.filter((p) => p.id !== postId),
            {
              ...post,
              comments: [...post.comments, commentId],
              updated_at,
            },
          ],
        };
      })
      .addCase(removeCommentFromPost, (state, action) => {
        const { postId, commentId, updated_at } = action.payload;

        const post = state.posts.filter((p) => p.id === postId)[0];
        if (!post) {
          // Post does not exist - return state.
          return state;
        }

        const postIncludesComment = post.comments.includes(commentId);
        if (!postIncludesComment) {
          // Comment already not in post's comments array.
          return state;
        }

        return {
          ...state,
          posts: [
            ...state.posts.filter((p) => p.id !== postId),
            {
              ...post,
              comments: post.comments.filter((c) => c === commentId),
              updated_at,
            },
          ],
        };
      });
  },
});

// Actions
export const { ADD_POST, REMOVE_POST, SET_POSTS } = slice.actions;

export const generatePosts = createAsyncThunk(
  "posts/generate",
  async (payload, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;
    const {
      topics: { topics: Topics },
      users: { users: Users },
    }: RootState = thunkAPI.getState() as RootState;

    // Final List of Posts.
    let List: IPost[] = [];

    // Amount of posts to create.
    const amount = Math.floor(Math.random() * 75) + 15;

    // Select a random author.
    const randomAuthor = (): IDType => {
      const id = Math.floor(Math.random() * (Users?.length - 1));
      return Users[id].id;
    };

    // Return a list or random topics.
    const randomTopics = (): ITopic[] => {
      const amount = Math.floor(Math.random() * (Topics?.length / 2)) + 1;
      let topics: ITopic[] = [];

      const pickTopic = (maxCall: number = 0): void => {
        const id = Math.floor(Math.random() * (Topics?.length - 1));
        if (maxCall >= Topics.length - 1) return;
        if (topics.includes(Topics[id])) pickTopic(maxCall + 1);
        else topics.push(Topics[id]);
      };

      for (let i = 0; i < amount; i++) {
        pickTopic();
      }

      return topics;
    };

    for (let i = 0; i < amount; i++) {
      const author = randomAuthor();
      const likes = Math.floor(Math.random() * 1000) + 1;
      const topics = randomTopics();
      const post = {
        id: nanoid(),
        author,
        content:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non.",
        likes,
        comments: [],
        topics,
        created_at: Date.now(),
        updated_at: Date.now(),
      };
      List.push(post);
    }

    dispatch(SET_POSTS(List));
    return List;
  }
);

export default slice.reducer;
