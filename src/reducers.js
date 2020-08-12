import { USER_INPUT } from "./constants";

const initialInputBox = {
  inputBox: "",
};

const initialGeneralState = {
  audioIsPlaying: false,
};

const initialCardState = {
  currentJapChar: "コ",
  currentRomaji: "",
  hintedCharList: [],
  wrongCharList: {},
  onIncorrectCard: false,
  curWrongChar: "",
  onHintedCard: false,
  wordCompleted: false,
  currentWord: "",
  prevTimestamp: null,
  charTimestamp: [],
  allCharTimestamp: [],
};

export const changeGeneralState = (
  state = initialGeneralState,
  action = {}
) => {
  switch (action.type) {
    case "PLAY_AUDIO":
      return { ...state, audioIsPlaying: true };
    case "PAUSE_AUDIO":
      return { ...state, audioIsPlaying: false };
    default:
      return state;
  }
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
        prevTimestamp: action.time,
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
      return {
        ...state,
        wordCompleted: false,
        charTimestamp: [],
        allCharTimestamp: [...state.allCharTimestamp, state.charTimestamp],
        prevTimestamp: action.time,
        hintedCharList: [],
      };
    case "COMPLETE_WORD":
      return { ...state, wordCompleted: true };
    case "UPDATE_WORD":
      return { ...state, currentWord: action.payload };
    case "COMPLETE_CHAR":
      const newTimestamp = {
        char: state.currentJapChar,
        time: action.time - state.prevTimestamp,
        type: action.completionType,
      };
      console.log("TIME STAMP", newTimestamp);
      return {
        ...state,
        charTimestamp: [...state.charTimestamp, newTimestamp],
        prevTimestamp: action.time,
      };
    case "SET_NEW_WORD_TIME":
      return { ...state, prevTimestamp: action.time };
    default:
      return state;
  }
};
