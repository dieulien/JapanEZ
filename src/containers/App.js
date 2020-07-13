import React, { Component } from "react";
import CharList from "../components/CharList.js";
import CharInput from "../components/CharInput";
import NavBar from "../components/NavBar";
import Hint from "../components/Hint";
import { Grid, Paper } from "@material-ui/core";
import "./App.css";
import charsToRead from "../jap-char.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      familiarity: 0,
    };
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  };

  onSubmit = () => {
    console.log("user have submitted");
  };

  render() {
    return (
      <div className="tc">
        <NavBar />
        <Grid container direction="column" justify="center" alignItems="center">
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
  }
}

export default App;
