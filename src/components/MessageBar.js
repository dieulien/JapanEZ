import React from "react";
import { Paper } from "@material-ui/core";
import "../scss/components/MessageBar.scss";
import shortid from "shortid";
import { makeStyles } from "@material-ui/core/styles"
import { PRIMARYCOLOR } from "../constants";

const useStyles = makeStyles({
  // typing effect taken from 
  // https://css-tricks.com/snippets/css/typewriter-effect/
  messageText: {
    fontSize: "calc(10px + 1vh)",
    textAlign: "center",
    margin: "0 auto",
  },
  // add this to have typing animation
  messageAnimation: {
    borderRight: "2px solid rgba(255, 255, 255, 0.75)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    animation: `$typewriter 4s steps(100) 0s 1 normal both,
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
  } else if (message.includes("Press spacebar again")) {
    length_in_em += 0.8;
  } else if (message.includes("stuck")) {
    length_in_em -= 0.2;
  } else if (message.includes("!")) {
    length_in_em += 0.5;
  }
  return length_in_em;
}

const MessageBar = (props) => {
  const classes = useStyles(props);

  return (
    <div className="message-box" style={{ color: "#5D5D5D" }}>
      <Paper elevation={0} />
      <div className="message">
        {props.displayHelpMessages ? (
          <p 
            className={`${classes.messageText}`} 
            key={shortid.generate()}
          >
            {props.message}
          </p>
        ) : (
          <p className={`${classes.messageText}`}>
            {`Welcome, ${props.userName}.`}
          </p>
        )}
      </div>
    </div>
  );
};

export default MessageBar;
