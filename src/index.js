import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "tachyons";
import App from "./containers/App.js";
import { changeInputBox, changeCardState } from "./reducers";

const rootReducer = combineReducers({ changeInputBox, changeCardState });
const logger = createLogger();

const store = createStore(rootReducer, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
