import React from "react";
import { connect } from "react-redux";
import "../scss/containers/App.scss";
import { Input } from "@material-ui/core";
import SpellCheckerBuffer from "../inputChecker";
import { katakanaToRomaji } from "../jap-char";
import {
  pressKey,
  onCorrectChar,
  typeAnswer,
  pressSpace,
  typeWrongAnswer,
  completeChar,
  pressEnter,
  updateChar,
  updateWord,
  completeWord,
  alertRomajiNotInDict,
  resetRomajiNotInDictAlert,
} from "../actions";

const mapStatestoProps = (state) => {
  return {
    indexCurrentCard: state.changeCardState.indexCurrentCard,
    romajiList: state.changeCardState.romajiList,
    cardStateList: state.changeCardState.cardStateList,
    curWrongChar: state.changeCardState.curWrongChar,
    onIncorrectCard: state.changeCardState.onIncorrectCard,
    wordCompleted: state.changeCardState.wordCompleted,
    onHintedCard: state.changeCardState.onHintedCard,
    currentRomaji: state.changeCardState.currentRomaji,
    currentWord: state.changeCardState.currentWord,
    audioIsPlaying: state.changeGeneralState.audioIsPlaying,
    inputBox: state.changeInputBox.inputBox,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onInputBoxChange: (value) => {
      dispatch(typeAnswer(value));
    },
    onKeyPress: (key) => {
      dispatch(pressKey(key));
    },
    onCorrectChar: () => {
      dispatch(onCorrectChar());
    },
    onSpacePress: (context) => {
      dispatch(pressSpace(context));
    },
    onWrongInput: (userChar, currentChar) => {
      dispatch(typeWrongAnswer(userChar, currentChar));
    },
    onCompleteChar: (time, type) => {
      dispatch(completeChar(time, type));
    },
    onEnterPress: (time) => {
      dispatch(pressEnter(time));
    },
    setCurrentChar: (japchar, romaji) => {
      dispatch(updateChar(japchar, romaji));
    },
    updateWord: (word, romajiList) => {
      dispatch(updateWord(word, romajiList));
    },
    onWordCompletion: () => {
      dispatch(completeWord());
    },
    alertRomajiNotInDict: () => {
      dispatch(alertRomajiNotInDict());
    },
    resetRomajiNotInDictAlert: () => {
      dispatch(resetRomajiNotInDictAlert());
    },
  };
};

class CharInput extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.inputChecker = new SpellCheckerBuffer(
      katakanaToRomaji,
      this.checkFunction,
      this.props.alertRomajiNotInDict
    );
  }

  componentDidMount() {
    const {
      setCurrentChar,
      romajiList,
      indexCurrentCard,
      currentWord,
    } = this.props;

    const curRomaji = romajiList[indexCurrentCard];
    const curKana = currentWord[indexCurrentCard];
    setCurrentChar(curKana, curRomaji);

    // https://stackoverflow.com/questions/37949981/call-child-method-from-parent
    this.props.setClick(this.buttonClickOrSpacePressHandler);
    this.props.matchClearFormInputFunction(this.clearInputBox);
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.user_uid === prevProps.user_uid) {
    }
  };

  checkFunction = (char) => {
    const {
      romajiList,
      indexCurrentCard,
      onCorrectChar,
      onWrongInput,
      onWordCompletion,
      currentWord,
      setCurrentChar,
      onCompleteChar,
      getKeyByValue,
      updateCharScore,
      user_uid,
    } = this.props;
    const userInputChar = getKeyByValue(katakanaToRomaji, char);

    if (char === romajiList[indexCurrentCard]) {
      updateCharScore(user_uid, userInputChar, "+1");
      onCorrectChar();
      onCompleteChar(Date.now(), "correct");

      const newRomaji = romajiList[indexCurrentCard + 1];
      const newKana = currentWord[indexCurrentCard + 1];
      setCurrentChar(newKana, newRomaji);

      if (indexCurrentCard === romajiList.length - 1) {
        onWordCompletion();
      }
    } else {
      onWrongInput(char, romajiList[indexCurrentCard]);
      var currentChar = getKeyByValue(
        katakanaToRomaji,
        romajiList[indexCurrentCard]
      );
      updateCharScore(user_uid, userInputChar, "0");
      updateCharScore(user_uid, currentChar, "0");
    }
  };

  onKeyDown = (event) => {
    const {
      onIncorrectCard,
      wordCompleted,
      onHintedCard,
      romajiList,
      indexCurrentCard,
      onWordCompletion,
      audioIsPlaying,
      cardStateList,
      disableAllAction,
      walkThroughEnabled,
      endWalkThrough,
    } = this.props;

    console.log(`${disableAllAction} disable action`)
    if (walkThroughEnabled) {
      if (event.which === 27) {
        endWalkThrough();
      } else if (disableAllAction) {
        event.preventDefault();
        return;
      }
    }
    // disable input
    if (audioIsPlaying) {
      event.preventDefault();
      return;
    }
    if (wordCompleted) {
      event.preventDefault();
    }
    var lastCardState = cardStateList[cardStateList.length - 1];
    if (
      indexCurrentCard === romajiList.length - 1 &&
      (lastCardState === "correct" || lastCardState === "hinted")
    ) {
      onWordCompletion();
    }
    // keycode 65 to 90 represents a-z
    if (
      ((event.which >= 65 && event.which <= 90) || event.which === 222) &&
      !onIncorrectCard &&
      !wordCompleted &&
      !onHintedCard
    ) {
      var key =
        event.which === 222
          ? "'"
          : String.fromCharCode(event.which).toLowerCase();
      this.props.onKeyPress(key);
      this.inputChecker.checkInput(key);
    } else {
      event.preventDefault();

      if (event.which === 32) { // space
        this.buttonClickOrSpacePressHandler(event.target);
      } else if (event.which === 8) { // backspace
        this.deleteIncorrectInput(event.target);
      } else if (event.which === 13) { // enter
        this.goToNextWord(event.target);
        this.fillHintedCharacter(event.target);
      }
    }
  };

  deleteIncorrectInput(eventTarget) {
    const {
      onIncorrectCard,
      curWrongChar,
      onInputBoxChange,
      onSpacePress,
      resetRomajiNotInDictAlert,
    } = this.props;

    if (onIncorrectCard) {
      // delete wrong input from inputBox
      eventTarget.value = eventTarget.value.slice(0, -curWrongChar.length);
      onInputBoxChange(eventTarget.value);
      onSpacePress("CONTINUE_AFTER_ERROR");
      resetRomajiNotInDictAlert();
    }  
  };

  clearInputBox(eventTarget) {
    eventTarget.value = "";
  };

  goToNextWord(eventTarget) {
    const {
      onSpacePress,
      onInputBoxChange,
      wordCompleted,
      moveToNextWord,
      requestedWord,
    } = this.props;

    if (wordCompleted) {
      moveToNextWord(requestedWord);
      onSpacePress("CONTINUE_AFTER_COMPLETE");
      eventTarget.value = "";
      onInputBoxChange(eventTarget.value);
    }
  }

  fillHintedCharacter = (eventTarget) => {
    const {
      onHintedCard,
      indexCurrentCard,
      romajiList,
      onWordCompletion,
      currentRomaji,
      onInputBoxChange,
      onEnterPress,
      setCurrentChar,
      currentWord,
    } = this.props;

    if (onHintedCard) {
      if (indexCurrentCard === romajiList.length - 1) {
        onWordCompletion();
      }
      // autofill correct answer
      eventTarget.value = eventTarget.value.concat(currentRomaji);
      onInputBoxChange(eventTarget.value);
      onEnterPress(Date.now());

      const curRomaji = romajiList[indexCurrentCard + 1];
      const curKana = currentWord[indexCurrentCard + 1];
      setCurrentChar(curKana, curRomaji);
    }
  }

  buttonClickOrSpacePressHandler = (eventTarget) => {
    const {
      onIncorrectCard,
      onInputBoxChange,
      onSpacePress,
      onCompleteChar,
      wordCompleted,
      onHintedCard,
      romajiList,
      indexCurrentCard,
      user_uid,
      updateCharScore,
      getKeyByValue,
      disableAllAction,
    } = this.props;
    
    if (disableAllAction) {
      return;
    }

    if (onIncorrectCard) {
      this.deleteIncorrectInput(eventTarget)
    } else if (!onIncorrectCard && !onHintedCard && !wordCompleted) {
      // ask for hint
      onSpacePress("REQUEST_HINT");
      onCompleteChar(Date.now(), "hinted");

      var currentChar = getKeyByValue(
        katakanaToRomaji,
        romajiList[indexCurrentCard]
      );
      updateCharScore(user_uid, currentChar, "+0");

      // clear inputBox
      eventTarget.value = this.inputChecker.buffer.length
        ? eventTarget.value.slice(0, -this.inputChecker.buffer.length)
        : eventTarget.value;
      onInputBoxChange(eventTarget.value);

      // clear inputChecker buffer
      this.inputChecker.checkInput("clearBuffer");
    } else if (wordCompleted) {
      this.goToNextWord(eventTarget)
    } else if (onHintedCard) {
      this.fillHintedCharacter(eventTarget);
    }
  };

  render() {
    return (
      <form>
        <Input
          className="input-box"
          placeholder="Your input..."
          inputProps={{ "aria-label": "description" }}
          onChange={this.props.onInputBoxChange}
          onKeyDown={this.onKeyDown}
          spellCheck={false}
          autoFocus
          inputRef={this.formRef}
          onPaste={(event) => {
            event.preventDefault();
          }}
        />
      </form>
    );
  }
}

export default connect(mapStatestoProps, mapDispatchToProps, null, {
  forwardRef: true,
})(CharInput);
