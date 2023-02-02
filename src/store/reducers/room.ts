import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IRoomState } from "../../models/room";

const initialState: IRoomState = {
  playerSymbol: "x",
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setPlayerSymbol: (state, action: PayloadAction<"x" | "o">) => ({
      ...state,
      playerSymbol: action.payload,
    }),
  },
});

// actions
export const { setPlayerSymbol } = roomSlice.actions;

export default roomSlice.reducer;
