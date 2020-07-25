import { USER_INPUT } from "./constants";

const initialState = {
  inputBox: "",
};

export const highlightCard = (state = initialState, action = {}) => {
  console.log(action.type);
  switch (action.type) {
    case USER_INPUT:
      return Object.assign({}, state, { inputBox: action.payload });
    default:
      return state;
  }
};
