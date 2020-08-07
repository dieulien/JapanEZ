import React from "react";
import "../containers/App.css";
import { Input } from "@material-ui/core";

class CharInput extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  render() {
    return (
      <form>
        <Input
          placeholder="Start typing here..."
          inputProps={{ "aria-label": "description" }}
          onChange={this.props.onInputChange}
          onKeyDown={this.props.onSpecialKeyPress}
          autoFocus
          inputRef={this.formRef}
        />
      </form>
    );
  }
}

export default CharInput;
