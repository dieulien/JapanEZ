import React, { Component } from "react";
import { connect } from "react-redux";
import CharList from "../components/CharList.js";
import CharInput from "../components/CharInput";
import NavBar from "../components/NavBar";
import Hint from "../components/Hint";
import { Grid, Paper } from "@material-ui/core";
import { katakanaToRomaji } from "../jap-char.js";
import Signin from "../components/Signin";
import Register from "../components/Register";
import WordCard from "../components/WordCard";
import "./App.css";
import {
  GETWORD_URL,
  CHARSCORE_URL,
  WORDSCORE_URL,
  TOFUGU_LINK,
  WORD_LINK,
} from "../constants";

import {
  typeAnswer,
  pressSpace,
  updateChar,
  pressEnter,
  typeWrongAnswer,
  completeWord,
  updateWord,
  completeChar,
} from "../actions";

const mapStateToProps = (state) => {
  return {
    userInput: state.changeInputBox.inputBox,
    currentJapChar: state.changeCardState.currentJapChar,
    currentRomaji: state.changeCardState.currentRomaji,
    hintedCharList: state.changeCardState.hintedCharList,
    wrongCharList: state.changeCardState.wrongCharList,
    onIncorrectCard: state.changeCardState.onIncorrectCard,
    curWrongChar: state.changeCardState.curWrongChar,
    onHintedCard: state.changeCardState.onHintedCard,
    wordCompleted: state.changeCardState.wordCompleted,
    currentWord: state.changeCardState.currentWord,
    charTimestamp: state.changeCardState.charTimestamp,
    audioIsPlaying: state.changeGeneralState.audioIsPlaying,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInputBoxChange: (event) => {
      dispatch(typeAnswer(event.target.value));
    },
    setCurrentChar: (japchar, romaji) => {
      dispatch(updateChar(japchar, romaji));
    },
    onEnterPress: (time) => {
      dispatch(pressEnter(time));
    },
    onWrongInput: (userChar, currentChar) => {
      dispatch(typeWrongAnswer(userChar, currentChar));
    },
    onSpacePress: (context) => {
      dispatch(pressSpace(context));
    },
    onWordCompletion: () => {
      dispatch(completeWord());
    },
    updateWord: (word) => {
      dispatch(updateWord(word));
    },
    onCompleteChar: (time, type) => {
      dispatch(completeChar(time, type));
    },
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: "signin",
      userInfo: {
        id: "",
        name: "",
        email: "",
        joined: "",
      },
      currentWordInfo: null,
    };
    this.charInputRef = React.createRef();
  }

  onRouteChange = (route) => {
    this.setState({ route: route });
  };

  parseJapaneseWord = (word) => {
    var charsToRead = [];
    for (const c of word) {
      var c_romaji = katakanaToRomaji[c] || "??";
      charsToRead.push({ char: c, romaji: c_romaji });
    }
    return charsToRead;
  };

  convertTimeToScoreDelta = (charTimestamp) => {
    return charTimestamp.map((item) => {
      var score_delta = 20000 / item.time;
      if (item.type === "hinted") {
        score_delta *= -1;
      }
      return {
        char: item.char,
        score_delta: score_delta,
      };
    });
  };

  updateCharScore = (user_uid, scoreDeltaList) => {
    fetch(CHARSCORE_URL, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_uid: user_uid,
        charScoreDeltaList: scoreDeltaList,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("update char score success", data);
      })
      .catch((error) => {
        console.log("Failed to update char score", error);
      });
  };

  updateWordScore = (user_uid, word) => {
    console.log("POST TO WORD", word);
    fetch(WORDSCORE_URL, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_uid: user_uid,
        word: word,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("update word score success", data);
      })
      .catch((error) => {
        console.log("Failed to update word score", error);
      });
  };

  requestNewWord = () => {
    fetch(GETWORD_URL, {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((word) => {
        this.props.updateWord(word.vocab_kana);
        this.setState({ currentWordInfo: word });
        console.log(
          "CURRENT WORD CHEAT",
          this.parseJapaneseWord(word.vocab_kana)
        );
      })
      .catch((err) => {
        console.log("Error in getting next word", err);
      });
  };

  onSpecialKeyPress = (event) => {
    const {
      currentRomaji,
      curWrongChar,
      onIncorrectCard,
      onHintedCard,
      onSpacePress,
      onEnterPress,
      onInputBoxChange,
      wordCompleted,
      onCompleteChar,
      charTimestamp,
      currentWord,
      audioIsPlaying,
    } = this.props;

    if (audioIsPlaying) {
      event.preventDefault();
      return;
    }

    if (onIncorrectCard || onHintedCard || wordCompleted) {
      event.preventDefault();
    }

    // handle SPACE press
    if (event.which === 32) {
      event.preventDefault();
      if (!onIncorrectCard && !onHintedCard && !wordCompleted) {
        onSpacePress("REQUEST_HINT");
        onCompleteChar(Date.now(), "hinted");
      } else if (onIncorrectCard) {
        // remove wrong input
        event.target.value = event.target.value.slice(0, -curWrongChar.length);
        onInputBoxChange(event);
        onSpacePress("CONTINUE_AFTER_ERROR");
      } else if (wordCompleted) {
        const scoreDeltaList = this.convertTimeToScoreDelta(charTimestamp);
        this.requestNewWord();
        this.updateCharScore(this.state.userInfo.id, scoreDeltaList);
        this.updateWordScore(this.state.userInfo.id, currentWord);
        onSpacePress("CONTINUE_AFTER_COMPLETE");

        event.target.value = "";
        onInputBoxChange(event);
      }
    }

    // handle ENTER press
    if (event.which === 13) {
      event.preventDefault();
      if (onHintedCard) {
        // autofill correct answer
        event.target.value = event.target.value.concat(currentRomaji);
        onInputBoxChange(event);
        onEnterPress(Date.now());
      }
    }
  };

  loadUser = (user) => {
    const { user_uid, name, email, joined } = user;
    this.setState((prevState) => {
      let userInfo = { ...prevState.userInfo };
      userInfo.name = name;
      userInfo.id = user_uid;
      userInfo.email = email;
      userInfo.joined = joined;
      return { userInfo };
    });
    console.log("userInfo", this.state.userInfo);
  };

  // refocus on inputbox when pressing ENTER or SPACE
  keypressGlobalHandler = (event) => {
    const { wordCompleted } = this.props;

    if (this.state.route === "home") {
      if (event.which === 32 || wordCompleted) {
      }
      if (event.which === 32 || event.which === 13) {
        event.preventDefault();
        this.charInputRef.current.formRef.current.focus();
      }
    }
  };

  componentDidMount() {
    document.addEventListener("keypress", this.keypressGlobalHandler);
    fetch(GETWORD_URL, {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((word) => {
        this.setState({ currentWordInfo: word });
        this.props.updateWord(word.vocab_kana);
        console.log(
          "CURRENT WORD CHEAT",
          this.parseJapaneseWord(word.vocab_kana)
        );
      })
      .catch((err) => {
        console.log("Error in getting first word", err);
      });
  }

  showHint = () => {
    if (this.props.onHintedCard) {
      return <Hint currentHintedChar={this.props.currentJapChar} />;
    }
  };

  displayWordInfo = () => {
    if (this.props.wordCompleted) {
      return <WordCard wordInfo={this.state.currentWordInfo} />;
    }
  };

  displayMessage = () => {
    const {
      onIncorrectCard,
      wrongCharList,
      curWrongChar,
      onHintedCard,
      wordCompleted,
    } = this.props;

    if (onIncorrectCard) {
      const userWrongInput = wrongCharList[curWrongChar];
      return (
        <div>
          <p>{`This character is not "${userWrongInput}"`}</p>
          <p>press SPACE to try again</p>
        </div>
      );
    } else if (onHintedCard) {
      return <p>press ENTER to continue</p>;
    } else if (wordCompleted) {
      return <p>press SPACE to continue</p>;
    } else {
      return <p>You can press SPACE for hint</p>;
    }
  };

  renderRoute = (route) => {
    switch (route) {
      case "signin":
        return (
          <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        );
      case "register":
        return (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        );
      case "home":
        const {
          userInput,
          onHintedCard,
          setCurrentChar,
          hintedCharList,
          onWrongInput,
          wrongCharList,
          onIncorrectCard,
          onWordCompletion,
          currentWord,
        } = this.props;

        return (
          <div>
            <NavBar onRouteChange={this.onRouteChange} />
            <div className="tmw5 center bg-white br3 pa1 ma1 ba b--black-10 o-40 tl">
              <Paper elevation={0} />
              <p>Welcome, {this.state.userInfo.name}! </p>
              <ul>
                <li>
                  Press SPACE to learn the character in the highlighted card
                </li>
                <li>
                  Type the character as fast as you can if you've already known
                  the character
                </li>
              </ul>
            </div>

            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Paper elevation={0} />
              <CharInput
                onInputChange={this.props.onInputBoxChange}
                onSpecialKeyPress={this.onSpecialKeyPress}
                ref={this.charInputRef}
              />
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item>
                  <CharList
                    charsToRead={this.parseJapaneseWord(currentWord)}
                    userInput={userInput}
                    hintDisplayOn={onHintedCard}
                    updateCurrentChar={setCurrentChar}
                    hintedCharList={hintedCharList}
                    onWrongInput={onWrongInput}
                    wrongCharList={wrongCharList}
                    onIncorrectCard={onIncorrectCard}
                    onWordCompletion={onWordCompletion}
                  />
                </Grid>
                <div>{this.displayMessage()}</div>
                <Grid item>
                  <Paper elevation={1} />
                  {this.showHint()}
                </Grid>
                <div>{this.displayWordInfo()}</div>
              </Grid>
            </Grid>
            <footer id="footer">
              <p>
                Mnemonics taken from <a href={TOFUGU_LINK}>tofugu.com</a>
              </p>
              <p>
                Japanese words taken from{" "}
                <a href={WORD_LINK}>reddit.com/r/LearnJapanese</a>
              </p>
            </footer>
          </div>
        );
      default:
        return <div>Default</div>;
    }
  };

  render() {
    return <div className="tc">{this.renderRoute(this.state.route)}</div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
