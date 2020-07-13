import React from "react";
import "../containers/App.css";
import { Input, Button } from "@material-ui/core";

const CharInput = ({ onInputChange, onSubmit }) => {
  return (
    <form>
      <Input
        placeholder="Start typing here..."
        inputProps={{ "aria-label": "description" }}
        onChange={onInputChange}
      />
      <Button variant="contained" color="primary" onClick={onSubmit}>
        Submit
      </Button>
    </form>
  );
};

export default CharInput;
