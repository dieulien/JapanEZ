import React from "react";
import Char from "./Char.js";
import { Grid } from "@material-ui/core";

const decideCardState = (userInput, cardIndex, currentChar) => {
  const userInputChar = userInput
    .split(" ")
    .filter((element) => element.length != 0);
  const userInputLength = userInputChar.length;
  console.log("DEBUG", userInputChar);
  console.log("current Char", currentChar);
  if (userInputLength >= cardIndex + 1) {
    if (userInputChar[cardIndex] === currentChar) {
      return "correct";
    } else {
      return "incorrect";
    }
  } else {
    return "";
  }
};

class CharList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const charsArrayDisplay = this.props.charsToRead.map((item, i) => {
      return (
        <Grid item key={i}>
          <Char
            char={item.char}
            key={i}
            cardState={decideCardState(this.props.userInput, i, item.romaji)}
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
  }
}

export default CharList;
