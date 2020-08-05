import { USER_INPUT } from "./constants";

const initialInputBox = {
  inputBox: "",
};

const initialCardState = {
  currentJapChar: "",
  currentRomaji: "",
  hintedCharList: [],
  wrongCharList: {},
  onIncorrectCard: false,
  curWrongChar: "",
  onHintedCard: false,
  wordCompleted: false,
  currentWord: "",
  currentHintedChar: "",
};

export const changeInputBox = (state = initialInputBox, action = {}) => {
  switch (action.type) {
    case USER_INPUT:
      return { ...state, inputBox: action.payload };
    default:
      return state;
  }
};

export const changeCardState = (state = initialCardState, action = {}) => {
  switch (action.type) {
    case "CHAR_UPDATE":
      return {
        ...state,
        currentJapChar: action.currentJapChar,
        currentRomaji: action.currentRomaji,
      };
    case "ENTER_PRESS":
      return {
        ...state,
        hintedCharList: [...state.hintedCharList, state.currentRomaji],
        onHintedCard: false,
      };
    case "WRONG_INPUT":
      state.wrongCharList[action.currentChar] = action.userInput;
      return {
        ...state,
        onIncorrectCard: true,
        curWrongChar: action.currentChar,
      };
    case "SPACE_PRESS_TO_CONTINUE":
      return { ...state, onIncorrectCard: false };
    case "SPACE_PRESS_FOR_HINT":
      return { ...state, onHintedCard: true };
    case "SPACE_PRESS_TO_GO_NEXT":
      return { ...state, wordCompleted: false };
    case "COMPLETE_WORD":
      return { ...state, wordCompleted: true };
    case "UPDATE_WORD":
      return { ...state, currentWord: action.payload };
    case "UPDATE_HINTED_CHAR":
      return { ...state, currentHintedChar: action.payload };
    default:
      return state;
  }
};
