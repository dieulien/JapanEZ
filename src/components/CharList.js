import React from "react";
import Char from "./Char.js";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { completeChar, setNewWordTime } from "../actions";

const mapStateToProps = (state) => {
  return {
    charTimestamp: state.changeCardState.charTimestamp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCompleteChar: (time, type) => {
      dispatch(completeChar(time, type));
    },
    setNewWordTime: (time) => {
      dispatch(setNewWordTime(time));
    },
  };
};

class CharList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dispatchTime: 0,
    };
  }

  componentDidMount = () => {
    const timeStamp = Date.now();
    this.props.setNewWordTime(timeStamp);
  };

  partitionCharIndex = (charList) => {
    var characterCounter = 0;

    const indexPartition = charList.map(
      (item) => (characterCounter += item.length)
    );

    return indexPartition;
  };

  decideCardState = (
    userInput,
    cardJapChar,
    cardRomaji,
    idx,
    indexPartition,
    hintDisplayOn,
    updateCurrentChar,
    hintedCharList,
    onWrongInput,
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
      if (userChar === cardRomaji) {
        if (hintedCharList.includes(cardRomaji)) {
          className = className.concat(" hinted ");

          /* this simple condition is crucial due to prevent repeated 'onCorrectChar' call due to repeated 
          rendering everytime the user types something and 
          update the redux store */
          if (idx >= this.props.charTimestamp.length) {
            this.props.onCompleteChar(Date.now(), "hinted");
          }
        } else {
          className = className.concat(" correct ");

          if (idx >= this.props.charTimestamp.length) {
            this.props.onCompleteChar(Date.now(), "correct");
          }
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
        onWrongInput(userChar, cardRomaji);
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
          updateCurrentChar(cardJapChar, cardRomaji);
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

export default connect(mapStateToProps, mapDispatchToProps)(CharList);
