import React, { Component } from "react";
import { connect } from "react-redux";
import CharList from "./CharList";
import CharInput from "./CharInput";
import NavBar from "../components/NavBar";
import Hint from "../components/Hint";
import { Grid, Paper } from "@material-ui/core";
import { katakanaToRomaji } from "../jap-char";
import Signin from "../components/Signin";
import Register from "../components/Register";
import WordCard from "../components/WordCard";
import OutsideAlerter from "../components/OutsideAlerter";
import Footer from "../components/Footer";
import WelcomeBar from "../components/WelcomeBar";
import SmallCharList from "../components/SmallCharList";

// make help dialog
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button } from "@material-ui/core";

import "../scss/containers/App.scss";
import {
  updateChar,
  updateWord,
  resetStore,
  typeAnswer,
  resetRomajiNotInDictAlert,
  completeChar,
  pressSpace,
} from "../actions";
import {
  GETWORD_URL,
  CHARSCORE_URL,
  UPDATECHARSCORE_URL,
  WORDSCORE_URL,
  MEDIA_BASE_URL_WORD,
} from "../constants";

import LogRocket from "logrocket";
LogRocket.init("zskhtw/japanese-learning");

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
    romajiNotInDict: state.changeInputBox.romajiNotInDict,
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
    onInputBoxChange: (value) => {
      dispatch(typeAnswer(value));
    },
    onSpacePress: (context) => {
      dispatch(pressSpace(context));
    },
    onCompleteChar: (time, type) => {
      dispatch(completeChar(time, type));
    },
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: "register",
      userInfo: {
        id: "",
        name: "",
        email: "",
        joined: "",
      },
      currentWordInfo: null,
      open: false,
      haveTriggered: false,
    };
    this.charInputRef = React.createRef();
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.userInfo.id !== prevState.userInfo.id) {
      this.props.resetStore();
      this.requestNewWord();
    }

    if (this.state.route === "home" && !this.state.haveTriggered) {
      setTimeout(() => {
        this.setState({ open: true });
      }, 60000 * 5);
    }
  };

  componentDidMount = () => {
    this.setState({ haveTriggered: false });
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

  updateCharScore2 = (user_uid, char, score) => {
    fetch(UPDATECHARSCORE_URL, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_uid: user_uid,
        char: char,
        score: score,
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
    LogRocket.identify(user_uid, {
      name: name,
      email: email,
      joined: joined,
    });
  };

  focusInputBox = () => {
    this.charInputRef.current.formRef.current.focus();
  };

  onClickCard = (event) => {
    const kana = event.target.innerText;
    this.setState({ clickedJapChar: kana });

    // unclick
    if (this.state.clickedJapChar === kana) {
      this.setState({ clickedJapChar: "" });
    }
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

  getKeyByValue = (object, value) => {
    return Object.keys(object).find((key) => object[key] === value);
  };

  displayMessage = () => {
    const {
      onIncorrectCard,
      curWrongChar,
      onHintedCard,
      wordCompleted,
      audioIsPlaying,
      romajiNotInDict,
      currentJapChar,
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
            <b>
              {romajiNotInDict
                ? `The romaji ${curWrongChar} does not exist in the alphabet`
                : `The romaji ${curWrongChar} corresponds to ${this.getKeyByValue(
                    katakanaToRomaji,
                    curWrongChar
                  )}, not ${currentJapChar}`}
            </b>
          </p>
          <p>
            <b>press SPACE to try again</b>
          </p>
        </div>
      );
    } else if (onHintedCard && !audioIsPlaying) {
      return (
        <p>
          <b>press SPACE to continue</b>
        </p>
      );
    } else if (wordCompleted && !audioIsPlaying) {
      return (
        <div>
          <p>
            <b>click on card to review mnemonic or press SPACE to continue</b>
          </p>
        </div>
      );
    } else if (!onHintedCard && !wordCompleted) {
      return (
        <p>
          <b>press SPACE to learn this character</b>
        </p>
      );
    } else {
      return <p></p>;
    }
  };

  displayMessage2 = () => {
    const {
      onIncorrectCard,
      curWrongChar,
      onHintedCard,
      wordCompleted,
      audioIsPlaying,
      romajiNotInDict,
      currentJapChar,
    } = this.props;
    if (audioIsPlaying) {
      return <div></div>;
    }
    if (onIncorrectCard) {
      return (
        <div>
          <p>
            <b>
              {romajiNotInDict
                ? `'${curWrongChar}' does not exist in the alphabet`
                : `'${curWrongChar}' corresponds to ${this.getKeyByValue(
                    katakanaToRomaji,
                    curWrongChar
                  )}, not ${currentJapChar}`}
            </b>
          </p>
        </div>
      );
    } else if (wordCompleted && !audioIsPlaying) {
      return (
        <div>
          <p>
            <b>Click on a card to view its mnemonic</b>
          </p>
        </div>
      );
    } else {
      return <p></p>;
    }
  };

  setButtonText = () => {
    const {
      onIncorrectCard,
      curWrongChar,
      onHintedCard,
      wordCompleted,
      audioIsPlaying,
      romajiNotInDict,
      currentJapChar,
    } = this.props;

    if (onIncorrectCard) {
      return "Try Again";
    } else if (onHintedCard && !audioIsPlaying) {
      return "Got It";
    } else if (wordCompleted && !audioIsPlaying) {
      return " Next Word";
    } else if (!onHintedCard && !wordCompleted) {
      return "Learn Character";
    } else {
      return "";
    }
  };

  renderRoute = (route) => {
    switch (route) {
      case "progress":
        return (
          <div className="progress-flex-container">
            <div className="progress-flex-item1">
              <NavBar
                onRouteChange={this.onRouteChange}
                currentTab="progress"
              />
            </div>
            <div className="progress-flex-item2">
              <SmallCharList user_uid={this.state.userInfo.id} />
            </div>
            <Footer />
          </div>
        );
      // case "signin":
      //   return (
      //     <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
      //   );
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
              <Dialog
                open={this.state.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Time's Up!"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <p>
                      You have used the app for 5 minute. Please click the link
                      below to take a short test that will access your Katakana
                      knowledge. Thank you for using the app!
                    </p>
                    <a
                      href="https://harvard.az1.qualtrics.com/jfe/form/SV_2aZI7SwLfhp5nxj"
                      className="survey-link"
                    >
                      https://harvard.az1.qualtrics.com/jfe/form/SV_2aZI7SwLfhp5nxj
                    </a>
                  </DialogContentText>
                </DialogContent>
              </Dialog>

              <NavBar onRouteChange={this.onRouteChange} currentTab="home" />
              <WelcomeBar userName={this.state.userInfo.name} />
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Paper elevation={0} />
                <OutsideAlerter focusInputBox={this.focusInputBox}>
                  <CharInput
                    updateCharScore={this.updateCharScore}
                    updateCharScore2={this.updateCharScore2}
                    updateWordScore={this.updateWordScore}
                    getKeyByValue={this.getKeyByValue}
                    user_uid={this.state.userInfo.id}
                    ref={this.charInputRef}
                    setClick={(click) => (this.clickChild = click)}
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
                  <div>{this.displayMessage2()}</div>
                  <Grid item>
                    {!this.props.audioIsPlaying ? (
                      <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          this.clickChild(
                            this.charInputRef.current.formRef.current
                          )
                        }
                        style={{ color: "white" }}
                      >
                        {this.setButtonText()}
                      </Button>
                    ) : (
                      <div></div>
                    )}
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing="2"
                  >
                    <Grid item>
                      <Paper elevation={1} />
                      {this.showHint()}
                    </Grid>
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
