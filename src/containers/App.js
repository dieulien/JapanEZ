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

import { typeAnswer, pressSpace, updateChar, pressEnter } from "../actions";

const mapStateToProps = (state) => {
  return {
    userInput: state.highlightCard.inputBox,
    currentChar: state.highlightCard.curChar,
    hintedCharList: state.highlightCard.hintedCharList,
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
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayHint: false,
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

  onInputChange = (event) => {
    const input = event.target.value;
    // console.log(input);
    event.target.value = "HACK";
  };

  onRouteChange = (route) => {
    this.setState({ route: route });
  };

  onSpecialKeyPress = (event) => {
    if (this.state.displayHint && event.which !== 13) {
      this.setState({ displayHint: false });
      console.log("Press Enter To Continue!");
      event.preventDefault();
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
    // handle SPACE press for HINT
    if (event.which === 32 && !this.state.displayHint) {
      event.preventDefault();
      this.setState({ displayHint: !this.state.displayHint });
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
    console.log("props", this.props);
    console.log("state", this.state);
    console.log("this", this);

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
                    userInput={this.props.userInput}
                    hintDisplayOn={this.state.displayHint}
                    updateCurrentChar={this.props.setCurrentChar}
                    hintedCharList={this.props.hintedCharList}
                  />
                </Grid>
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
