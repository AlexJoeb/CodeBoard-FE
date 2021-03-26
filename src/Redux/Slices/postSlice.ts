import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { IPost, ITopic } from "../../utils/types";
import { v4 as uuidv4 } from 'uuid';

const initialState: IPost[] = [];
const slice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		VOID_POSTS: state => initialState,
		SET_POSTS_LIST: (state, action: PayloadAction<IPost[]>) => action.payload,
		ADD_POST: (state, action: PayloadAction<IPost>) => {
			state.push(action.payload)
		},
		REMOVE_POST: (state, action: PayloadAction<number | string>) => state.filter(p => p.id !== action.payload),
		UPDATE_POST: (state, action: PayloadAction<{ id: number; updates: Partial<IPost> }>) => {
			const { id, updates } = action.payload;
			return state.map(p => {
				// Not the item we're looking for. Keep moving.
				if(p.id !== id) return p;
				else return {
					...p,
					...updates,
				}
			})
		},
		APPEND_COMMENT: (state, action: PayloadAction<{ id: number | string; commentId: number | string }>) => {
			const { id, commentId } = action.payload;
			return state.map(p => {
				// Not the item we're looking for. Keep moving.
				if(p.id !== id) return p;
				// CommentID already in list.
				if(p.comments.includes(commentId)) return p;
				return { 
					...p,
					comments: p.comments.concat([commentId]),
				}
			});
		}
	}
});

const voidAllCommentsAction = () => (createAction<undefined>('comments/void'))();
export const voidAllComments = (): AppThunk => dispatch => {
	dispatch(voidAllCommentsAction());
};

// export const voidAllPosts = (): AppThunk => dispatch => {
// 	dispatch(VOID_POSTS());
// };

// export const setPosts = (posts: IPost[]): AppThunk => dispatch => {
// 	dispatch(SET_POSTS(posts));
// };

// export const addPost = (post: IPost): AppThunk => dispatch => {
// 	dispatch(ADD_POST(post));
// };

// export const removePostById = (id: number): AppThunk => dispatch => {
// 	dispatch(REMOVE_POST(id));
// };

// export const updatePost = (id: number, updates: Partial<IPost>): AppThunk => dispatch => {
// 	dispatch(UPDATE_POST({ id, updates }));
// };

// export const appendComment = (id: number | string, commentId: number | string): AppThunk => dispatch => {
// 	dispatch(APPEND_COMMENT({ id, commentId }));
// };

export const generatePosts = (): AppThunk => (dispatch, getState) => {
	const { posts: Posts, topics: Topics, users: Users } = getState();
	const amount = Math.floor(Math.random() * 75) + 15;
	let List: IPost[] = [];

	const randomAuthor = (): number => {
		const id = Math.floor(Math.random() * (Users?.length - 1));
		return id;
	};

	const randomTopics = (): ITopic[] => {
		const amount = Math.floor(Math.random() * Topics?.length) + 1;
		let topics: ITopic[] = [];

		const pickTopic = (maxCall:number = 0): void => {
			const id = Math.floor(Math.random() * (Topics?.length - 1));
			if (maxCall >= 5) return;
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
			id: uuidv4(),
			author,
			content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non.",
			likes,
			comments: [],
			topics,
			created_at: Date.now(),
			updated_at: Date.now()
		};
		List.push(post);
	}

	dispatch(SET_POSTS(List));
};

export default slice.reducer;
