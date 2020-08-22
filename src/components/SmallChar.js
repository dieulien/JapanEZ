import React from "react";
import "../scss/containers/App.scss";
import "../scss/components/SmallChar.scss";

class SmallChar extends React.Component {
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
    return (
      <div
        className={"small-card"}
        onClick={this.props.onClickCard}
        onMouseOver={this.onMouseOver}
        onMouseLeave={this.onMouseLeave}
        style={{
          background: "linear-gradient(0deg, green 50%, #f2b50c 50%)",
        }}
      >
        <b>{this.props.char}</b>
      </div>
    );
  }
}

export default SmallChar;
