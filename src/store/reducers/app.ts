import { createSlice } from "@reduxjs/toolkit";
import { IAppState } from "../../models/app";

const initialState: IAppState = {
  status: "idle",
  error: undefined,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

// actions
export const {} = appSlice.actions;

export default appSlice.reducer;
