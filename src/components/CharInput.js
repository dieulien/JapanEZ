import React from "react";
import "../containers/App.css";
import { Input, Button } from "@material-ui/core";

const CharInput = ({ onInputChange }) => {
  return (
    <form>
      <Input
        placeholder="Start typing here..."
        inputProps={{ "aria-label": "description" }}
        onChange={onInputChange}
      />
    </form>
  );
};

export default CharInput;
