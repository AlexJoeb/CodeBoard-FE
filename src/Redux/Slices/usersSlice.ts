import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";
import { ERole, IUser } from "../../utils/types";

interface IUsersState {
  users: IUser[];
  loading: boolean;
}

const initialState: IUsersState = {
  users: [],
  loading: false,
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    VOID_USERS: (_) => initialState,
    SET_USERS: (state, action: PayloadAction<IUser[]>) => ({
      ...state,
      users: action.payload,
    }),
  },
});

const { SET_USERS } = slice.actions;

export const generateUsers = createAsyncThunk(
  "users/generate",
  async (_, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;

    // Final list of users.
    let List: IUser[] = [];

    // Number of users to create.
    const amount = Math.floor(Math.random() * 75) + 15;

    // Get user's name.
    const getRandomName = () => {
      const Names: string[] = [
        "parkingfence",
        "cocktailenderman",
        "synagoguechipped",
        "blowfishcarrots",
        "dangocactus",
        "bangbangair",
        "ledgerpainting",
        "urnlodestone",
        "postboxlever",
        "speakerstal",
        "scorpionvex",
        "moyaijukebox",
        "minibuspillar",
        "dropletgravelly",
        "cartwheelbarrel",
        "chainslamp",
        "sailboatlooting",
        "roflcolumn",
        "rowboatbaked",
        "symbolstube",
        "birthdayendermite",
        "hibiscustrapdoor",
        "burritobirchwood",
        "koalanautilus",
        "sparkleritem",
        "couplekissmidlands",
        "princenote",
        "sakeslime",
        "projectorvindicator",
        "notebookghast",
        "bathtuboverworld",
        "eggplantnugget",
        "octopuscrafting",
        "monoraillime",
        "diamondsflame",
        "chipmunkinfested",
        "abcfox",
        "menorahedge",
        "sharkstaned",
        "dollarnetherrack",
        "guardsmanhills",
        "fencerrespiration",
        "newspapersquid",
        "tulipsoil",
        "speedboatclock",
        "airplanecave",
        "unamusedstew",
        "homescoal",
        "massageingot",
      ];
      const idx = Math.floor(Math.random() * Names.length + 1);
      return Names[idx];
    };

    for (let i = 0; i < amount; i++) {
      const username = getRandomName();
      const role =
        Math.floor(Math.random() * 10) + 0 > 1 ? ERole.USER : ERole.ADMIN;
      const imgId = Math.floor(Math.random() * 11) + 1;
      const user = {
        id: nanoid(),
        username,
        role,
        profile_image: `/assets/faces/${imgId}.png`,
      };

      List.push(user);
    }

    dispatch(SET_USERS(List));
    return List;
  }
);

export default slice.reducer;
