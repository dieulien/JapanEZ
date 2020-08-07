// Taken from this https://stackoverflow.com/questions/47686345/playing-sound-in-reactjs
import React from "react";
import Button from "@material-ui/core/Button";

class Music extends React.Component {
  state = {
    play: false,
    audio: new Audio(`${this.props.audioLink}`),
  };

  componentDidMount() {
    this.state.audio.addEventListener("ended", () =>
      this.setState({ play: false })
    );
    setTimeout(() => {
      this.state.audio.play();
    }, this.props.delay);
  }

  componentWillUnmount() {
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
        <Button variant="contained" color="primary" onClick={this.togglePlay}>
          {this.state.play ? "Pause Audio" : "Play Audio"}
        </Button>
      </div>
    );
  }
}

export default Music;
