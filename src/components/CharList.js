import React from "react";
import Char from "./Char.js";
import { Grid } from "@material-ui/core";

const decideCardState = (userInput, cardIndex) => {
  if (userInput.length === cardIndex) {
    return "highlighted";
  } else {
    return "";
  }
};

const CharList = (props) => {
  const charsArrayDisplay = props.charsToRead.map((item, i) => {
    return (
      <Grid item key={i}>
        <Char
          char={item.char}
          key={i}
          cardState={decideCardState(props.userInput, i)}
        />
      </Grid>
    );
  });
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing="1"
    >
      {charsArrayDisplay}
    </Grid>
  );
};

export default CharList;
