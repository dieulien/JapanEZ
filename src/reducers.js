import { USER_INPUT } from "./constants";

const initialState = {
  inputBox: "",
  curChar: "",
  hintedCharList: [],
  wrongCharList: {},
  onIncorrectCard: false,
  curWrongChar: "",
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
    case "WRONG_INPUT":
      state.wrongCharList[action.currentChar] = action.userInput;
      return {
        ...state,
        onIncorrectCard: true,
        curWrongChar: action.currentChar,
      };
    case "SPACE_PRESS":
      return { ...state, onIncorrectCard: false };
    default:
      return state;
  }
};
