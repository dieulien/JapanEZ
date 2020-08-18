import { USER_INPUT } from "./constants";
// import update from "react-addons-update";

const initialInputBox = {
  inputBox: "",
  keyPressed: "",
};

const initialGeneralState = {
  audioIsPlaying: false,
};

const initialCardState = {
  currentJapChar: "",
  currentRomaji: "",
  currentWord: "",
  curWrongChar: "",
  hintedCharList: [],
  wrongCharList: {},
  onIncorrectCard: false,
  onHintedCard: false,
  wordCompleted: false,
  prevTimestamp: null,
  charTimestamp: [],
  allCharTimestamp: [],
  romajiList: [],
  indexCurrentCard: 0,
  cardStateList: [],
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
    case "PRESS_KEY":
      return { ...state, keyPressed: action.payload };
    case "RESET_STORE":
      return { ...state, inputBox: "", keyPressed: "" };
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
      state.cardStateList[state.indexCurrentCard] = "hinted";
      return {
        ...state,
        hintedCharList: [...state.hintedCharList, state.currentRomaji],
        onHintedCard: false,
        prevTimestamp: action.time,
        indexCurrentCard: state.indexCurrentCard + 1,
      };
    case "WRONG_INPUT":
      state.wrongCharList[action.currentChar] = action.userInput;
      state.cardStateList[state.indexCurrentCard] = "incorrect";
      return {
        ...state,
        onIncorrectCard: true,
        curWrongChar: action.userInput,
      };
    case "SPACE_PRESS_TO_CONTINUE":
      state.cardStateList[state.indexCurrentCard] = "";
      return { ...state, onIncorrectCard: false };
    case "SPACE_PRESS_FOR_HINT":
      return { ...state, onHintedCard: true };
    case "SPACE_PRESS_TO_GO_NEXT":
      return {
        ...state,
        wordCompleted: false,
        charTimestamp: [],
        allCharTimestamp: [...state.allCharTimestamp, state.charTimestamp],
        // prevTimestamp: action.time,
        hintedCharList: [],
      };
    case "COMPLETE_WORD":
      return { ...state, wordCompleted: true };
    case "UPDATE_WORD":
      return {
        ...state,
        currentWord: action.payload,
        romajiList: action.romajiList,
        cardStateList: action.cardStateList,
        indexCurrentCard: 0,
      };
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
    case "INPUT_CORRECT_CHAR":
      // state.cardStateList[state.indexCurrentCard] = "correct";
      return {
        ...state,
        indexCurrentCard: state.indexCurrentCard + 1,
        cardStateList: state.cardStateList.map((item, idx) =>
          idx === state.indexCurrentCard ? "correct" : item
        ),
      };
    case "INPUT_INCORRECT_CHAR":
      // state.cardStateList[state.indexCurrentCard] = "incorrect";
      return {
        ...state,
        cardStateList: state.cardStateList.map((item, idx) =>
          idx === state.indexCurrentCard ? "incorrect" : item
        ),
      };
    case "RESET_STORE":
      return {
        ...state,
        allCharTimestamp: [],
        charTimestamp: [],
        curWrongChar: null,
        onHintedCard: false,
        onIncorrectCard: false,
        wordCompleted: false,
        wrongCharList: {},
      };
    default:
      return state;
  }
};
