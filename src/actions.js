import { USER_INPUT } from "./constants.js";

export const typeAnswer = (text) => {
  console.log(text);
  return {
    type: USER_INPUT,
    payload: text,
  };
};
