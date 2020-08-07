import { USER_INPUT } from "./constants.js";

export const typeAnswer = (text) => {
  return {
    type: USER_INPUT,
    payload: text,
  };
};

export const pressSpace = (context) => {
  switch (context) {
    case "REQUEST_HINT":
      return {
        type: "SPACE_PRESS_FOR_HINT",
      };
    case "CONTINUE_AFTER_ERROR":
      return {
        type: "SPACE_PRESS_TO_CONTINUE",
      };
    case "CONTINUE_AFTER_COMPLETE":
      return {
        type: "SPACE_PRESS_TO_GO_NEXT",
        time: Date.now(),
      };
    default:
      return {
        type: "SPACE_PRESS",
      };
  }
};

export const updateChar = (japchar, romaji) => {
  return {
    type: "CHAR_UPDATE",
    currentJapChar: japchar,
    currentRomaji: romaji,
  };
};

export const pressEnter = (time) => {
  return {
    type: "ENTER_PRESS",
    time: time,
  };
};

export const typeWrongAnswer = (userChar, currentChar) => {
  return {
    type: "WRONG_INPUT",
    userInput: userChar,
    currentChar: currentChar,
  };
};

export const completeWord = () => {
  return {
    type: "COMPLETE_WORD",
  };
};

export const updateWord = (word) => {
  return {
    type: "UPDATE_WORD",
    payload: word,
  };
};

export const completeChar = (timestamp, completionType) => {
  return {
    type: "COMPLETE_CHAR",
    time: timestamp,
    completionType: completionType,
  };
};

export const setNewWordTime = (time) => {
  return {
    type: "SET_NEW_WORD_TIME",
    time: time,
  };
};
