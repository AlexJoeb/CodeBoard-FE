import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../utils/types";

interface IUserState {
  user: IUser | null;
  jwt: string | null;
  loading: boolean;
}

const initialState: IUserState = {
  user: null,
  jwt: null,
  loading: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    VOID_USER: (_) => initialState,
    SET_USER: (state, action: PayloadAction<IUser>) => ({
      ...state,
      user: action.payload,
    }),
  },
});

export default slice.reducer;
