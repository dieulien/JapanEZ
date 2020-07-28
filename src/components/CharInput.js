import React from "react";
import "../containers/App.css";
import { Input } from "@material-ui/core";

const CharInput = ({ onInputChange, onSpecialKeyPress }) => {
  return (
    <form>
      <Input
        placeholder="Start typing here..."
        inputProps={{ "aria-label": "description" }}
        onChange={onInputChange}
        onKeyDown={onSpecialKeyPress}
      />
    </form>
  );
};

export default CharInput;
