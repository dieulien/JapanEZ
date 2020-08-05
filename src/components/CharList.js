import React from "react";
import { connect } from "react-redux";
import Char from "./Char.js";
import { Grid } from "@material-ui/core";

class CharList extends React.Component {
  partitionCharIndex = (charList) => {
    var characterCounter = 0;

    const indexPartition = charList.map(
      (item) => (characterCounter += item.length)
    );

    return indexPartition;
  };

  decideCardState = (
    userInput,
    currentJapChar,
    currentRomaji,
    idx,
    indexPartition,
    hintDisplayOn,
    updateCurrentChar,
    hintedCharList,
    onWrongInput,
    wrongCharList,
    onIncorrectCard,
    onWordCompletion
  ) => {
    var userChar = "";
    var className = "";
    var indexOfCurrentCard = null;
    var romajiLength = indexPartition[indexPartition.length - 1];

    if (userInput.length >= indexPartition[idx]) {
      // infer userChar using partitioning indices
      if (idx === 0) {
        userChar = userInput.slice(0, indexPartition[idx]);
      } else {
        userChar = userInput.slice(
          indexPartition[idx - 1],
          indexPartition[idx]
        );
      }
      if (userChar === currentRomaji) {
        if (hintedCharList.includes(currentRomaji)) {
          className = className.concat(" hinted ");
        } else {
          className = className.concat(" correct ");
        }
        if (
          userInput.length >= romajiLength &&
          idx === indexPartition.length - 1
        ) {
          // if the last card is correct
          onWordCompletion();
        }
      } else {
        className = className.concat(" incorrect ");
        onWrongInput(userChar, currentRomaji);
      }
    }

    // decide which Card to highlight
    for (var i = 0; i < indexPartition.length; i++) {
      if (userInput.length < indexPartition[i]) {
        if (!onIncorrectCard) {
          indexOfCurrentCard = i;
        } else {
          indexOfCurrentCard = i - 1;
        }
        if (idx === indexOfCurrentCard) {
          className = className.concat(" highlighted ");
          updateCurrentChar(currentJapChar, currentRomaji);
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
    const indexPartition = this.partitionCharIndex(charList);

    const charsArrayDisplay = this.props.charsToRead.map((item, i) => {
      return (
        <Grid item key={i}>
          <Char
            char={item.char}
            key={i}
            cardState={this.decideCardState(
              this.props.userInput,
              item.char,
              item.romaji,
              i,
              indexPartition,
              this.props.hintDisplayOn,
              this.props.updateCurrentChar,
              this.props.hintedCharList,
              this.props.onWrongInput,
              this.props.wrongCharList,
              this.props.onIncorrectCard,
              this.props.onWordCompletion
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
