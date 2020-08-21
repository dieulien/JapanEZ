import React from "react";
import "../scss/containers/App.scss";
import "../scss/components/Char.scss";

class Char extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
    };
  }

  onMouseOver = () => {
    if (this.props.wordCompleted) this.setState({ isHovered: true });
  };

  onMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  render() {
    const hovered = this.state.isHovered ? "hovered" : "";
    const className = `card tmw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10 ${
      this.props.cardState
    } ${this.props.wordCompleted ? "card-button" : ""}`;
    return (
      <div
        className={className}
        onClick={this.props.onClickCard}
        onMouseOver={this.onMouseOver}
        onMouseLeave={this.onMouseLeave}
      >
        <h1 className="char">{this.props.char}</h1>
      </div>
    );
  }
}

export default Char;
