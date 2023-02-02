import { RootState } from "..";

export const selectRoom = (state: RootState) => {
  const room = state.room;
  return room;
};
