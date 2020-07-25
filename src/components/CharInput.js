import React from "react";
import "../containers/App.css";
import { Input } from "@material-ui/core";

const CharInput = ({ onInputChange, spacePress }) => {
  return (
    <form>
      <Input
        placeholder="Start typing here..."
        inputProps={{ "aria-label": "description" }}
        onChange={onInputChange}
        onKeyPress={spacePress}
      />
    </form>
  );
};

export default CharInput;
