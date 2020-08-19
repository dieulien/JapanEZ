import React, { Component } from "react";
import { connect } from "react-redux";
import CharList from "./CharList.js";
import CharInput from "./CharInput";
import NavBar from "../components/NavBar";
import Hint from "../components/Hint";
import { Grid, Paper } from "@material-ui/core";
import { katakanaToRomaji } from "../jap-char.js";
import Signin from "../components/Signin";
import Register from "../components/Register";
import WordCard from "../components/WordCard";
import OutsideAlerter from "../components/OutsideAlerter";
import Footer from "../components/Footer";
import "./App.css";
import { updateChar, updateWord, resetStore } from "../actions";
import {
  GETWORD_URL,
  CHARSCORE_URL,
  WORDSCORE_URL,
  MEDIA_BASE_URL_WORD,
} from "../constants";

const mapStateToProps = (state) => {
  return {
    currentJapChar: state.changeCardState.currentJapChar,
    onIncorrectCard: state.changeCardState.onIncorrectCard,
    curWrongChar: state.changeCardState.curWrongChar,
    onHintedCard: state.changeCardState.onHintedCard,
    wordCompleted: state.changeCardState.wordCompleted,
    currentWord: state.changeCardState.currentWord,
    charTimestamp: state.changeCardState.charTimestamp,
    audioIsPlaying: state.changeGeneralState.audioIsPlaying,
    indexCurrentCard: state.changeCardState.indexCurrentCard,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentChar: (japchar, romaji) => {
      dispatch(updateChar(japchar, romaji));
    },
    updateWord: (word, romajiList) => {
      dispatch(updateWord(word, romajiList));
    },
    resetStore: () => {
      dispatch(resetStore());
    },
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: "signin",
      userInfo: {
        id: "",
        name: "",
        email: "",
        joined: "",
      },
      currentWordInfo: null,
    };
    this.charInputRef = React.createRef();
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.userInfo.id !== prevState.userInfo.id) {
      this.props.resetStore();
      this.requestNewWord();
    }
  };

  onRouteChange = (route) => {
    this.setState({ route: route });
  };

  parseJapaneseWord = (word) => {
    var charsToRead = [];
    for (const c of word) {
      var c_romaji = katakanaToRomaji[c] || "??";
      charsToRead.push({ char: c, romaji: c_romaji });
    }
    return charsToRead;
  };

  convertTimeToScoreDelta = (charTimestamp) => {
    return charTimestamp.map((item) => {
      var score_delta = 20000 / item.time;
      if (item.type === "hinted") {
        score_delta *= -1;
      }
      return {
        char: item.char,
        score_delta: score_delta,
      };
    });
  };

  updateCharScore = (user_uid, scoreDeltaList) => {
    fetch(CHARSCORE_URL, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_uid: user_uid,
        charScoreDeltaList: scoreDeltaList,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Update Char Score:", data);
      })
      .catch((error) => {
        console.log("Failed to update char score", error);
      });
  };

  updateWordScore = (user_uid, word) => {
    fetch(WORDSCORE_URL, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_uid: user_uid,
        word: word,
        unix_time: this.state.currentWord_unix_time,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Update Word Score:", data);
        // once score is updated, request new word
        this.requestNewWord();
      })
      .catch((error) => {
        console.log("Failed to update word score", error);
      });
  };

  parseAudio = (audio_string) => {
    return audio_string.slice(7, audio_string.length - 1);
  };

  requestNewWord = () => {
    const { setCurrentChar, updateWord } = this.props;
    var romajiList = [];
    this.setState({ clickedJapChar: "" });

    fetch(GETWORD_URL, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_uid: this.state.userInfo.id,
      }),
    })
      .then((res) => res.json())
      .then((word) => {
        var unix_time = Date.now();
        romajiList = this.parseJapaneseWord(word.vocab_kana).map(
          (item) => item.romaji
        );
        updateWord(word.vocab_kana, romajiList);
        const curRomaji = romajiList[0];
        const curKana = word.vocab_kana.charAt(0);
        setCurrentChar(curKana, curRomaji);

        this.setState({ currentWordInfo: word });
        this.setState({ currentWord_unix_time: unix_time });
        const word_audio = new Audio(
          `${MEDIA_BASE_URL_WORD}${this.parseAudio(word.vocab_sound_local)}`
        );
        word_audio.addEventListener("loadedmetadata", (event) => {
          this.setState({
            word_audio_duration: event.target.duration,
          });
        });
      })
      .catch((err) => {
        console.log("Error in getting next word", err);
      });
  };

  loadUser = (user) => {
    const { user_uid, name, email, joined } = user;
    this.setState((prevState) => {
      let userInfo = { ...prevState.userInfo };
      userInfo.name = name;
      userInfo.id = user_uid;
      userInfo.email = email;
      userInfo.joined = joined;
      return { userInfo };
    });
    console.log("userInfo", this.state.userInfo);
  };

  focusInputBox = () => {
    this.charInputRef.current.formRef.current.focus();
  };

  onClickCard = (event) => {
    const kana = event.target.innerText;
    this.setState({ clickedJapChar: kana });
  };

  showHint = () => {
    // once completed word, can review hint card
    if (this.props.wordCompleted && this.state.clickedJapChar) {
      return <Hint currentHintedChar={this.state.clickedJapChar} />;
    }
    if (this.props.onHintedCard) {
      return <Hint currentHintedChar={this.props.currentJapChar} />;
    }
  };

  displayWordInfo = () => {
    if (this.props.wordCompleted) {
      return (
        <WordCard
          wordInfo={this.state.currentWordInfo}
          word_audio_duration={this.state.word_audio_duration}
        />
      );
    }
  };

  displayMessage = () => {
    const {
      onIncorrectCard,
      curWrongChar,
      onHintedCard,
      wordCompleted,
      audioIsPlaying,
    } = this.props;
    if (audioIsPlaying) {
      return (
        <p>
          <b>♬ playing audio ♬</b>
        </p>
      );
    }
    if (onIncorrectCard) {
      return (
        <div>
          <p>
            <b>{`This character is not "${curWrongChar}"`}</b>
          </p>
          <p>
            <b>press SPACE to try again</b>
          </p>
        </div>
      );
    } else if (onHintedCard && !audioIsPlaying) {
      return (
        <p>
          <b>press ENTER to continue</b>
        </p>
      );
    } else if (wordCompleted && !audioIsPlaying) {
      return (
        <p>
          <b>press SPACE to continue</b>
        </p>
      );
    } else if (!onHintedCard && !wordCompleted) {
      return (
        <p>
          <b>You can press SPACE for hint</b>
        </p>
      );
    } else {
      return <p></p>;
    }
  };

  renderRoute = (route) => {
    switch (route) {
      case "signin":
        return (
          <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        );
      case "register":
        return (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        );
      case "home":
        const { currentWord } = this.props;

        return (
          <div className="page-container" style={{ position: "relative" }}>
            <div className="content-wrap">
              <NavBar onRouteChange={this.onRouteChange} />
              <div
                className="tmw5 center bg-white br3 pa1 ma1 ba b--black-10 tl"
                style={{ color: "#5D5D5D" }}
              >
                <Paper elevation={0} />
                <p>Welcome, {this.state.userInfo.name}! </p>
                <ul>
                  <li>
                    Press SPACE to learn the character in the highlighted card
                  </li>
                  <li>
                    Type the character as fast as you can if you've already
                    known the character
                  </li>
                </ul>
              </div>
              <br />

              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                style={{ paddingBottom: "100px" }}
              >
                <Paper elevation={0} />
                <OutsideAlerter focusInputBox={this.focusInputBox}>
                  <CharInput
                    updateCharScore={this.updateCharScore}
                    updateWordScore={this.updateWordScore}
                    user_uid={this.state.userInfo.id}
                    ref={this.charInputRef}
                  />
                </OutsideAlerter>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item>
                    <CharList
                      charsToRead={this.parseJapaneseWord(currentWord)}
                      onClickCard={this.onClickCard}
                      clickedJapChar={this.state.clickedJapChar}
                    />
                  </Grid>
                  <div>{this.displayMessage()}</div>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing="1"
                  >
                    <Grid item>
                      <Paper elevation={1} />
                      {this.showHint()}
                    </Grid>
                    <br />

                    <Grid item>{this.displayWordInfo()}</Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
            <Footer />
          </div>
        );
      default:
        return <div>Default</div>;
    }
  };

  render() {
    return <div className="tc">{this.renderRoute(this.state.route)}</div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
