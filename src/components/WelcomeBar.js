import React from "react";
import { Paper } from "@material-ui/core";
import "../scss/components/WelcomeBar.scss";
import shortid from "shortid";
import { makeStyles } from "@material-ui/core/styles"
import { PRIMARYCOLOR } from "../constants";

const useStyles = makeStyles({
  // typing effect taken from 
  // https://css-tricks.com/snippets/css/typewriter-effect/
  message: {
    margin: "0 auto",
    borderRight: "2px solid rgba(255, 255, 255, 0.75)",
    fontSize: "calc(10px + 1vh)",
    textAlign: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
    animation: `$typewriter 4s steps(100) 0.25s 1 normal both,
      $blinkTextCursor 1s steps(100) infinite normal`
    ,
    maxWidth: (props) => {
      return `${convertMessageLengthToEm(props.message)}em`;
    },
  },
  "@keyframes typewriter": {
    "from": {
      width: "0",
    },
    "to": {
      width: `100%` 
    },
  },
  "@keyframes blinkTextCursor": {
    "0%": {
    borderRightColor: PRIMARYCOLOR,
    },
      "49%": {
      borderRightColor: PRIMARYCOLOR,
    },
      "50%": {
      borderRightColor: "transparent",
    },
  }
})

const convertMessageLengthToEm = (message) => {
  // base em
  var length_in_em = message.length/2.29;

  // fine-grain adjustment based on message
  if (message.includes("mnemonic")) {
    length_in_em += 0.75;
  } else if (message.includes("corresponds")) {
    length_in_em += 1.1;
  } else if (message.includes("exist")) {
    length_in_em -= 0.2;
  } else if (message.includes("spacebar")) {
    length_in_em += 1;
  } else if (message.includes("!")) {
    length_in_em += 0.5;
  }
  return length_in_em;
}

const WelcomeBar = (props) => {
  const classes = useStyles(props);

  return (
    <div className="container" style={{ color: "#5D5D5D" }}>
      <Paper elevation={0} />
      <div className="welcome-text">
        <p className={classes.message} key={shortid.generate()}>{props.message}</p>
      </div>
    </div>
  );
};

export default WelcomeBar;
