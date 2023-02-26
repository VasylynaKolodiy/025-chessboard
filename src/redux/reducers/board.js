import {SET_FEN} from "../actions/board";

const initialState = {
  fen: ".w.w.w....w......W.b.W.............B..........b....b....b......."
};

export default function board(state = initialState, action) {
  switch (action.type) {
    case SET_FEN:
      return {
        ...state,
        fen: action.payload,
      };
    default:
      return state;
  }
}
