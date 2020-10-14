import React from "react";
import "../scss/containers/App.scss";
import "../scss/components/Char.scss";

class Char extends React.Component {
  render() {
    const className = `card ${this.props.cardState} ${
      this.props.wordCompleted ? "card-button" : ""
    }`;
    return (
      <div className={className} onClick={this.props.onClickCard}>
        <h1 className="char">{this.props.char}</h1>
      </div>
    );
  }
}

export default Char;
