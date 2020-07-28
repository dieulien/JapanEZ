import { USER_INPUT } from "./constants.js";

export const typeAnswer = (text) => {
  return {
    type: USER_INPUT,
    payload: text,
  };
};

export const pressSpace = () => {
  return {
    type: "SPACE_PRESS",
  };
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
