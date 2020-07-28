import React, { Component } from "react";
import { connect } from "react-redux";
import CharList from "../components/CharList.js";
import CharInput from "../components/CharInput";
import NavBar from "../components/NavBar";
import Hint from "../components/Hint";
import { Grid, Paper } from "@material-ui/core";
import { charsToRead } from "../jap-char.js";
import Signin from "../components/Signin";
import Register from "../components/Register";
import "./App.css";

import {
  typeAnswer,
  pressSpace,
  updateChar,
  pressEnter,
  typeWrongAnswer,
} from "../actions";

const mapStateToProps = (state) => {
  return {
    userInput: state.highlightCard.inputBox,
    currentChar: state.highlightCard.curChar,
    hintedCharList: state.highlightCard.hintedCharList,
    wrongCharList: state.highlightCard.wrongCharList,
    onIncorrectCard: state.highlightCard.onIncorrectCard,
    curWrongChar: state.highlightCard.curWrongChar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInputBoxChange: (event) => {
      dispatch(typeAnswer(event.target.value));
    },
    onSpecialKeyPress: () => {
      dispatch(pressSpace());
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
    onSpacePress: () => {
      dispatch(pressSpace());
    },
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayHint: false,
      wrongInput: false,
      currentChar: "",
      displayChars: "a-i-ta-na-ki-chi",
      userInput: "",
      familiarity: 0,
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

  onSpecialKeyPress = (event) => {
    if (event.which === 8) {
      event.preventDefault();
    }

    if (this.state.displayHint && event.which !== 13) {
      console.log("Press Enter To Continue!");
      event.preventDefault();
    }

    // handle SPACE press for HINT
    if (
      !this.props.onIncorrectCard &&
      event.which === 32 &&
      !this.state.displayHint
    ) {
      event.preventDefault();
      this.setState({ displayHint: true });
    }

    // handle SPACE press on incorrect input
    if (this.props.onIncorrectCard) {
      event.preventDefault();
      if (event.which === 32) {
        const curWrongChar = this.props.curWrongChar;
        var curInputBox = event.target.value.slice(0, -curWrongChar.length);
        event.target.value = curInputBox.concat(curWrongChar);

        this.props.onInputBoxChange(event);
        this.props.onSpacePress();
        event.target.value = event.target.value;
      } else {
        console.log("Press Space To Reveal Correct Answer");
      }
    }

    // handle ENTER press
    if (event.which === 13) {
      event.preventDefault();
      if (this.state.displayHint) {
        this.setState({ displayHint: false });

        // autofill correct answer
        event.target.value = event.target.value.concat(this.props.currentChar);
        this.props.onInputBoxChange(event);
        this.props.onEnterPress();
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
    fetch("https://shrouded-harbor-11572.herokuapp.com/profile/".concat(id))
      .then((response) => response.json())
      .then((data) => console.log("current user", data));
  }

  showHint = () => {
    if (this.state.displayHint) {
      return <Hint />;
    }
  };

  displayMessage = () => {
    if (this.props.onIncorrectCard) {
      const userInput = this.props.wrongCharList[this.props.curWrongChar];
      return (
        <div>
          <p>{`This character is not \"${userInput}\"`}</p>
          <p>press SPACE to reveal the correct romaji</p>
        </div>
      );
    }
    if (this.state.displayHint) {
      return <p>press ENTER to continue</p>;
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
          setCurrentChar,
          hintedCharList,
          onWrongInput,
          wrongCharList,
          onIncorrectCard,
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
                    charsToRead={charsToRead}
                    userInput={userInput}
                    hintDisplayOn={this.state.displayHint}
                    updateCurrentChar={setCurrentChar}
                    hintedCharList={hintedCharList}
                    onWrongInput={onWrongInput}
                    wrongCharList={wrongCharList}
                    onIncorrectCard={onIncorrectCard}
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
