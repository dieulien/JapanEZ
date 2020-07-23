import { USER_INPUT } from "./constants";

const initialState = {
  inputBox: "sample Input",
};

export const highlightCard = (state = initialState, action = {}) => {
  console.log(action.type);
  switch (action.type) {
    case USER_INPUT:
      return Object.assign({}, state, { searchField: action.payload });
    default:
      return state;
  }
};
