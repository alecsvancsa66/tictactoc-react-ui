import { combineReducers } from "redux";

import room from "./room";
import app from "./app";

const rootReducer = combineReducers({
  app,
  room,
});

export default (state: any, action: any) => {
  return rootReducer(state, action);
};
