import { USER_INPUT } from "./constants";

const initialState = {
  inputBox: "",
  curChar: "",
  hintedCharList: ["test", "hi"],
};

export const highlightCard = (state = initialState, action = {}) => {
  switch (action.type) {
    case USER_INPUT:
      return Object.assign({}, state, { inputBox: action.payload });
    case "CHAR_UPDATE":
      return Object.assign({}, state, { curChar: action.curChar });
    case "ENTER_PRESS":
      return {
        ...state,
        hintedCharList: [...state.hintedCharList, state.curChar],
      };
    default:
      return state;
  }
};
