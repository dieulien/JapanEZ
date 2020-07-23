import React, { Component } from "react";
import CharList from "../components/CharList.js";
import CharInput from "../components/CharInput";
import NavBar from "../components/NavBar";
import Hint from "../components/Hint";
import { Grid, Paper } from "@material-ui/core";
import "./App.css";
import charsToRead from "../jap-char.js";
import Signin from "../components/Signin";
import Register from "../components/Register";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    console.log(input);
  };

  onRouteChange = (route) => {
    this.setState({ route: route });
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
                onInputChange={this.onInputChange}
                onSubmit={this.onSubmit}
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
                    userInput={this.state.userInput}
                  />
                </Grid>
                <Grid item>
                  <Paper elevation={1} />
                  <Hint />
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

export default App;
