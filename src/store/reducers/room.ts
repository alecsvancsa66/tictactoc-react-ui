import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IRoomState } from "../../models/room";

const initialState: IRoomState = {
  playerSymbol: "x",
  isMyTurn: false,
  isGameStarted: false,
  roomPassword: undefined,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setPlayerSymbol: (state, action: PayloadAction<"x" | "o">) => ({
      ...state,
      playerSymbol: action.payload,
    }),
    setIsMyTurn: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isMyTurn: action.payload,
    }),
    setIsGameStarted: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isGameStarted: action.payload,
    }),
    setRoomPassword: (state, action: PayloadAction<string>) => ({
      ...state,
      roomPassword: action.payload,
    }),
  },
});

// actions
export const {
  setPlayerSymbol,
  setIsMyTurn,
  setIsGameStarted,
  setRoomPassword,
} = roomSlice.actions;

export default roomSlice.reducer;
