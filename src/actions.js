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
    default:
      return {
        type: "SPACE_PRESS",
      };
  }
};

export const updateChar = (char) => {
  return {
    type: "CHAR_UPDATE",
    curChar: char,
  };
};

export const pressEnter = () => {
  return {
    type: "ENTER_PRESS",
  };
};

export const typeWrongAnswer = (userChar, currentChar) => {
  return {
    type: "WRONG_INPUT",
    userInput: userChar,
    currentChar: currentChar,
  };
};
