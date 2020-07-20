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
    console.log(event.target.value);
  };

  onSubmit = () => {
    console.log("user have submitted");
  };

  onRouteChange = (route) => {
    this.setState({ route: route });
    console.log("ROUTE CHANGED!");
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
    console.log(this.state.userInfo);
  };

  // componentDidMount() {
  //   fetch("http://localhost:3001")
  //     .then((response) => response.json())
  //     .then((data) => console.log("HELLO FROM CLIENT", data));
  // }

  renderRoute = (route) => {
    switch (route) {
      case "signin":
        return <Signin onRouteChange={this.onRouteChange} />;
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
                  <CharList charsToRead={charsToRead} />
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
