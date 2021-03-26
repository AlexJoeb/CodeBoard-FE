import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { IUser, ERole } from "../../utils/types";
import { v4 as uuidv4 } from 'uuid';

const slice = createSlice({
	name: "users",
	initialState: [] as IUser[],
	reducers: {
		VOID_USERS: state => {
			return [];
		},
		SET_USERS: (state, action: PayloadAction<IUser[]>) => {
			return action.payload;
		},
		ADD_USER: (state, action: PayloadAction<IUser>) => {
			return [...state, action.payload];
		},
		REMOVE_USER: (state, action: PayloadAction<number | string>) => {
			return state = state.filter(user => user.id !== action.payload);
		},
		UPDATE_USER: (state, action: PayloadAction<{ id: number; updates: Partial<IUser> }>) => {
			const { id, updates } = action.payload;
			const newUser = {
				...state.filter(user => user.id === id)[0],
				...updates
			}
			return [
				...state.filter(user => user.id !== id),
				newUser,
			]
		}
	}
});

export const { SET_USERS, VOID_USERS, ADD_USER, REMOVE_USER, UPDATE_USER } = slice.actions;

export const voidAllUsers = (): AppThunk => dispatch => {
	dispatch(VOID_USERS());
};

export const setUsers = (users: IUser[]): AppThunk => dispatch => {
	dispatch(SET_USERS(users));
};

export const addUser = (user: IUser): AppThunk => dispatch => {
	dispatch(ADD_USER(user));
};

export const removeUserById = (id: number): AppThunk => dispatch => {
	dispatch(REMOVE_USER(id));
};

export const updateUser = (id: number, updates: Partial<IUser>): AppThunk => dispatch => {
	dispatch(UPDATE_USER({ id, updates }));
};

export const generateUsers = (): AppThunk => (dispatch, getState) => {
	const Users = getState().users;
	const amount = Math.floor(Math.random() * 75) + 15;
	let List: IUser[] = [];

	const getRandomName = () => {
		const Names: string[] = ["parkingfence", "cocktailenderman", "synagoguechipped", "blowfishcarrots", "dangocactus", "bangbangair", "ledgerpainting", "urnlodestone", "postboxlever", "speakerstal", "scorpionvex", "moyaijukebox", "minibuspillar", "dropletgravelly", "cartwheelbarrel", "chainslamp", "sailboatlooting", "roflcolumn", "rowboatbaked", "symbolstube", "birthdayendermite", "hibiscustrapdoor", "burritobirchwood", "koalanautilus", "sparkleritem", "couplekissmidlands", "princenote", "sakeslime", "projectorvindicator", "notebookghast", "bathtuboverworld", "eggplantnugget", "octopuscrafting", "monoraillime", "diamondsflame", "chipmunkinfested", "abcfox", "menorahedge", "sharkstaned", "dollarnetherrack", "guardsmanhills", "fencerrespiration", "newspapersquid", "tulipsoil", "speedboatclock", "airplanecave", "unamusedstew", "homescoal", "massageingot"];
		const idx = Math.floor(Math.random() * Names.length + 1);
		return Names[idx];
	};

	for (let i = 0; i < amount; i++) {
		const username = getRandomName();
		const role = Math.floor(Math.random() * 10) + 0 > 1 ? ERole.USER : ERole.ADMIN;
		const imgId = Math.floor(Math.random() * 11) + 1;
		const user = {
			id: uuidv4(),
			username,
			role,
			profile_image: `/assets/faces/${imgId}.png`
		};

		List.push(user);
	}

	dispatch(SET_USERS(List));
};

export default slice.reducer;
