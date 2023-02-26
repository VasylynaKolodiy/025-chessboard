import { combineReducers } from "redux";
import board from "./board";

const reducers = combineReducers({
  board: board,
});

export { reducers };



