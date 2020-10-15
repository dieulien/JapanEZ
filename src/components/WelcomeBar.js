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
  return (message.includes("corresponds") 
    ? (message.length/2.29) + 1
    : (message.length/2.29)
  );
}

const WelcomeBar = (props) => {
  const classes = useStyles(props);

  return (
    <div className="container" style={{ color: "#5D5D5D" }}>
      <Paper elevation={0} />
      <div className="welcome-text">
        {/* <p className="line-1 anim-typewriter" key={shortid.generate()}>{message}</p> */}
        <p className={classes.message} key={shortid.generate()}>{props.message}</p>
      </div>
    </div>
  );
};

export default WelcomeBar;
