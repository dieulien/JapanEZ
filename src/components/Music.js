import React from "react";

class Music extends React.Component {
  state = {
    play: false,
    audio: new Audio(`${this.props.audioLink}`),
  };

  componentDidMount() {
    this.state.audio.addEventListener("ended", () =>
      this.setState({ play: false })
    );
    console.log("audio file", `${this.props.audioLink}`);
  }

  componentWillUnmont() {
    this.state.audio.removeEventListener("ended", () =>
      this.setState({ play: false })
    );
  }

  togglePlay = () => {
    this.setState({ play: !this.state.play }, () => {
      this.state.play ? this.state.audio.play() : this.state.audio.pause();
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.togglePlay}>
          {this.state.play ? "Pause" : "Play"}
        </button>
      </div>
    );
  }
}

export default Music;
