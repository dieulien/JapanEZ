import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import "./scss/index.scss";
import * as serviceWorker from "./serviceWorker";
// import "tachyons"; // mess with material-ui Textfield
import App from "./containers/App.js";
import {
  changeGeneralState,
  changeInputBox,
  changeCardState,
} from "./reducers";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import "typeface-roboto";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1CB0F6",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

const rootReducer = combineReducers({
  changeGeneralState,
  changeInputBox,
  changeCardState,
});
const logger = createLogger();

const store = createStore(rootReducer, applyMiddleware(logger));
// const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
