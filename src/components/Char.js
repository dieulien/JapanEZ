import React from "react";
import "../containers/App.css";
import "./Char.css";

class Char extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardStateDecided: false,
      cardState: "em",
    };
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("COMPONENT UPDATE 1", prevProps);
    console.log("COMPONENT UPDATE 2", this.props);
    if (this.props.cardState !== prevProps.cardState) {
      this.setState({ cardState: this.props.cardState });
    }
  }

  render() {
    const className = `tmw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10 ${this.state.cardState}`;
    return (
      <div className={className}>
        <h1 className="char">{this.props.char}</h1>
      </div>
    );
  }
}

export default Char;
