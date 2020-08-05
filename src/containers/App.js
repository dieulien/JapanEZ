import React, { Component } from "react";
import { connect } from "react-redux";
import CharList from "../components/CharList.js";
import CharInput from "../components/CharInput";
import NavBar from "../components/NavBar";
import Hint from "../components/Hint";
import { Grid, Paper } from "@material-ui/core";
import { charsToRead, katakanaToRomaji } from "../jap-char.js";
import Signin from "../components/Signin";
import Register from "../components/Register";
import { PROFILE_URL, GETWORD_URL } from "../constants";
import "./App.css";

import {
  typeAnswer,
  pressSpace,
  updateChar,
  pressEnter,
  typeWrongAnswer,
  completeWord,
  updateWord,
} from "../actions";

const mapStateToProps = (state) => {
  return {
    userInput: state.changeInputBox.inputBox,
    currentChar: state.changeCardState.curChar,
    hintedCharList: state.changeCardState.hintedCharList,
    wrongCharList: state.changeCardState.wrongCharList,
    onIncorrectCard: state.changeCardState.onIncorrectCard,
    curWrongChar: state.changeCardState.curWrongChar,
    onHintedCard: state.changeCardState.onHintedCard,
    wordCompleted: state.changeCardState.wordCompleted,
    currentWord: state.changeCardState.currentWord,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInputBoxChange: (event) => {
      dispatch(typeAnswer(event.target.value));
    },
    setCurrentChar: (char) => {
      dispatch(updateChar(char));
    },
    onEnterPress: () => {
      dispatch(pressEnter());
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
    };
  }

  onRouteChange = (route) => {
    this.setState({ route: route });
  };

  parseJapaneseWord = (word) => {
    var charToRead = [];
    for (const c of word) {
      var c_romaji = katakanaToRomaji[c] || "??";
      charToRead.push({ char: c, romaji: c_romaji });
    }
    return charToRead;
  };

  onSpecialKeyPress = (event) => {
    const {
      currentChar,
      curWrongChar,
      onIncorrectCard,
      onHintedCard,
      onSpacePress,
      onEnterPress,
      onInputBoxChange,
      wordCompleted,
    } = this.props;

    if (onIncorrectCard || onHintedCard || wordCompleted) {
      event.preventDefault();
    }

    // handle SPACE press
    if (event.which === 32) {
      event.preventDefault();
      if (!onIncorrectCard && !onHintedCard && !wordCompleted) {
        onSpacePress("REQUEST_HINT");
      } else if (onIncorrectCard) {
        // remove wrong input
        event.target.value = event.target.value.slice(0, -curWrongChar.length);
        onInputBoxChange(event);
        onSpacePress("CONTINUE_AFTER_ERROR");
      } else if (wordCompleted) {
        fetch(GETWORD_URL, {
          method: "get",
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then((word) => {
            this.props.updateWord(word);
            console.log("CURRENT WORD CHEAT", this.parseJapaneseWord(word));
          })
          .catch((err) => {
            console.log("Error in getting next word", err);
          });
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
        event.target.value = event.target.value.concat(currentChar);
        onInputBoxChange(event);
        onEnterPress();
      }
    }
  };

  loadUser = (user) => {
    const { id, name, email, joined } = user;
    this.setState((prevState) => {
      let userInfo = { ...prevState.userInfo };
      userInfo.name = name;
      userInfo.id = id;
      userInfo.email = email;
      userInfo.joined = joined;
      return { userInfo };
    });
    console.log("userInfo", this.state.userInfo);
  };

  componentDidMount() {
    console.log("userInfoMount", this.state.userInfo);
    const id = this.state.userInfo.id;
    fetch(PROFILE_URL.concat(id))
      .then((response) => response.json())
      .then((data) => console.log("current user", data));

    fetch(GETWORD_URL, {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((word) => {
        this.props.updateWord(word);
        console.log("CURRENT WORD CHEAT", this.parseJapaneseWord(word));
      })
      .catch((err) => {
        console.log("Error in getting first word", err);
      });
  }

  showHint = () => {
    if (this.props.onHintedCard) {
      return <Hint />;
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
    }
    if (onHintedCard) {
      return <p>press ENTER to continue</p>;
    }
    if (wordCompleted) {
      return <p>press SPACE to continue</p>;
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
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Paper elevation={0} />
              <h1>Learn Hiragana on the go</h1>
              <h1>User: {this.state.userInfo.name} </h1>
              <CharInput
                onInputChange={this.props.onInputBoxChange}
                onSpecialKeyPress={this.onSpecialKeyPress}
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
              </Grid>
            </Grid>
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
