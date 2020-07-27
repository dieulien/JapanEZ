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

  decideCardState = (userInput, currentChar, idx, indexPartition) => {
    var userChar = "";
    var className = "";
    if (userInput.length >= indexPartition[idx]) {
      if (idx === 0) {
        userChar = userInput.slice(0, indexPartition[idx]);
      } else {
        userChar = userInput.slice(
          indexPartition[idx - 1],
          indexPartition[idx]
        );
      }
      if (userChar === currentChar) {
        className = className.concat("correct");
      } else {
        className = className.concat("incorrect");
      }
    }

    for (var i = 0; i < indexPartition.length; i++) {
      if (userInput.length < indexPartition[i]) {
        console.log(userInput.length);
        console.log(indexPartition[i]);
        if (idx === i) {
          className = className.concat(" highlighted");
        }
        break;
      }
    }

    return className;
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
