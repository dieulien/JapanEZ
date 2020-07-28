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
