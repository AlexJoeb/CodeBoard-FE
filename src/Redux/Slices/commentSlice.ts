import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { IComment } from "../../utils/types";
import { appendComment } from "./postSlice";
import { v4 as uuidv4 } from 'uuid';

const slice = createSlice({
	name: "comments",
	initialState: [] as IComment[],
	reducers: {
		VOID_COMMENTS: state => {
			return state = [];
		},
		SET_COMMENTS: (state, action: PayloadAction<IComment[]>) => {
			return state = action.payload;
		},
		ADD_COMMENT: (state, action: PayloadAction<IComment>) => {
			return [...state, action.payload];
		},
		REMOVE_COMMENT: (state, action: PayloadAction<number | string>) => {
			return state.filter(comment => comment.id !== action.payload);
		},
		UPDATE_COMMENT: (state, action: PayloadAction<{ id: number; updates: Partial<IComment> }>) => {
			const { id, updates } = action.payload;
			const oldComment = state.filter(comment => comment.id === id)[0];
			const newComment = {
				...oldComment,
				...updates
			}
			return [
				...state.filter(comment => comment.id !== id),
				newComment,
			]
		}
	}
});

export const { SET_COMMENTS, VOID_COMMENTS, ADD_COMMENT, REMOVE_COMMENT, UPDATE_COMMENT } = slice.actions;

export const voidAllComments = (): AppThunk => dispatch => {
	dispatch(VOID_COMMENTS());
};

export const setComments = (comments: IComment[]): AppThunk => dispatch => {
	dispatch(SET_COMMENTS(comments));
};

export const addComment = (comment: IComment): AppThunk => dispatch => {
	dispatch(ADD_COMMENT(comment));
};

export const removeCommentById = (id: number): AppThunk => dispatch => {
	dispatch(REMOVE_COMMENT(id));
};

export const updateComment = (id: number, updates: Partial<IComment>): AppThunk => dispatch => {
	dispatch(UPDATE_COMMENT({ id, updates }));
};

export const generateComments = (): AppThunk => (dispatch, getState) => {
	const { comments: Comments, users: Users, posts: Posts } = getState();
	const amount = Math.floor(Math.random() * 75) + 15;
	let List: IComment[] = [];

	const randomAuthor = (): number => {
		const id = Math.floor(Math.random() * (Users?.length - 1));
		return id;
	};

	const randomPost = (): number => {
		const id = Math.floor(Math.random() * (Posts?.length - 1));
		return id;
	};

	for (let i = 0; i < amount; i++) {
		const id = uuidv4();
		const author = randomAuthor();
		const post = randomPost();
		const likes = Math.floor(Math.random() * 1000) + 1;

		const comment: IComment = {
			id,
			author,
			post,
			content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam.",
			likes,
			created_at: Date.now(),
			updated_at: Date.now()
		};

		dispatch(appendComment(post, id));
		List.push(comment);
	}
	return dispatch(SET_COMMENTS(List));
};

export default slice.reducer;
