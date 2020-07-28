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

  decideCardState = (
    userInput,
    currentChar,
    idx,
    indexPartition,
    hintDisplayOn,
    updateCurrentChar,
    hintedCharList
  ) => {
    var userChar = "";
    var className = "";
    var indexOfCurrentCard = null;

    // judge which card is correct/incorrect
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
        if (hintedCharList.includes(currentChar)) {
          className = className.concat(" hinted ");
        } else {
          className = className.concat(" correct ");
        }
      } else {
        className = className.concat(" incorrect ");
      }
    }

    // decide which Card to highlight
    for (var i = 0; i < indexPartition.length; i++) {
      if (userInput.length < indexPartition[i]) {
        indexOfCurrentCard = i;
        if (idx === i) {
          className = className.concat(" highlighted ");
          updateCurrentChar(currentChar);
        }
        break;
      }
    }

    // fade all cards except the highlighted one
    if (hintDisplayOn) {
      if (idx !== indexOfCurrentCard) {
        className = className.concat(" o-30 ");
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
              indexPartition,
              this.props.hintDisplayOn,
              this.props.updateCurrentChar,
              this.props.hintedCharList
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
