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

  render() {
    const { correctPercent, hintedPercent } = this.props;
    var background = "";
    if (correctPercent === 0 && hintedPercent === 0) {
      background = `#d6d6d6`;
    } else {
      background = `linear-gradient(0deg, green 0% ${correctPercent}%, #f2b50c ${correctPercent}% ${hintedPercent}%)`;
    }
    return (
      <div
        className={"small-card"}
        style={{
          background: background,
        }}
      >
        <b>{this.props.char}</b>
      </div>
    );
  }
}

export default SmallChar;
