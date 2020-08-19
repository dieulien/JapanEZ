// Taken from this https://stackoverflow.com/questions/47686345/playing-sound-in-reactjs
import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { onAudioPlay, onAudioPause } from "../actions";

const mapStateToProps = (state) => {
  return {
    audioIsPlaying: state.changeGeneralState.audioIsPlaying,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAudioPlay: () => {
      dispatch(onAudioPlay());
    },
    onAudioPause: () => {
      dispatch(onAudioPause());
    },
  };
};

class Music extends React.Component {
  state = {
    play: false,
    audio: new Audio(`${this.props.audioLink}`),
  };

  componentDidMount() {
    this.state.audio.addEventListener("ended", () => {
      this.setState({ play: false });
      if (!this.props.noStoreUpdateWhenEnded) {
        this.props.onAudioPause();
      }
    });
    setTimeout(() => {
      this.state.audio.play();
      this.props.onAudioPlay();
    }, this.props.delay);
  }

  componentWillUnmount() {
    this.state.audio.removeEventListener("ended", () =>
      this.setState({ play: false })
    );
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.clickedHintCard !== this.props.clickedHintCard) {
      this.state.audio.play();
      this.props.onAudioPlay();
    }
  };

  togglePlay = () => {
    this.setState({ play: !this.state.play }, () => {
      if (this.state.play) {
        this.state.audio.play();
        this.props.onAudioPlay();
      } else {
        this.state.audio.pause();
        this.props.onAudioPause();
      }
    });
  };

  render() {
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.togglePlay}
          style={{ color: "#ffffff" }}
        >
          {this.state.play ? "Pause Audio" : "Play Audio"}
        </Button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Music);
