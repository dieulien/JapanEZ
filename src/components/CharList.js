import React from "react";
import Char from "./Char.js";
import { Grid } from "@material-ui/core";

class CharList extends React.Component {
  constructor(props) {
    super(props);
  }

  partitionCharIndex = (charList) => {
    var characterCounter = 0;

    const indexPartition = charList.map(
      (item) => (characterCounter += item.length)
    );

    return indexPartition;
  };

  decideCardState = (userInput, currentChar, i, indexPartition) => {
    var userChar = "";
    if (userInput.length >= indexPartition[i]) {
      if (i === 0) {
        userChar = userInput.slice(0, indexPartition[i]);
      } else {
        userChar = userInput.slice(indexPartition[i - 1], indexPartition[i]);
      }
      if (userChar === currentChar) {
        return "correct";
      } else {
        return "incorrect";
      }
    } else {
      return "";
    }
  };

  render() {
    const charList = this.props.charsToRead.map((item) => item.romaji);
    const phrase = charList.reduce((acc, item) => acc.concat(item), "");
    const indexPartition = this.partitionCharIndex(charList);

    const charsArrayDisplay = this.props.charsToRead.map((item, i) => {
      return (
        <Grid item key={i}>
          <Char
            char={item.char}
            key={i}
            cardState={this.decideCardState(
              this.props.userInput,
              item.romaji,
              i,
              indexPartition
            )}
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
