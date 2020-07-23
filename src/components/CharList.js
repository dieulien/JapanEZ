import React from "react";
import Char from "./Char.js";
import { Grid } from "@material-ui/core";

const CharList = (props) => {
  const charsArrayDisplay = props.charsToRead.map((item, i) => {
    console.log("index", props.userInput);
    return (
      <Grid item>
        <Char char={item.char} />
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
};

export default CharList;
