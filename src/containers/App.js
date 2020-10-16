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
import MessageBar from "../components/MessageBar";
import SmallCharList from "../components/SmallCharList";
import KatakanaChart from "../components/KatakanaChart";
import { Button } from "@material-ui/core";
import LoadingPopup from "../components/LoadingPopup"
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// dialog
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import "../scss/containers/App.scss";
import {
  updateChar,
  updateWord,
  resetStore,
} from "../actions";
import {
  GETWORD_URL,
  UPDATECHARSCORE_URL,
  WORDSCORE_URL,
  MEDIA_BASE_URL_WORD,
  USER_TIME_LIMIT_IN_MINUTES,
} from "../constants";
import {
  listOfPraises,
  listOfSoftPraises,
  WALKTHROUGH_PART_1,
  WALKTHROUGH_PART_2,
  WALKTHROUGH_PART_3,
  WALKTHROUGH_PART_4,
} from "../constants/App-constants"

import LogRocket from "logrocket";

// test introjs
import 'intro.js/introjs.css';
import { Steps } from 'intro.js-react';

LogRocket.init("zskhtw/japanese-learning");

const mapStateToProps = (state) => {
  return {
    currentJapChar: state.changeCardState.currentJapChar,
    onIncorrectCard: state.changeCardState.onIncorrectCard,
    curWrongChar: state.changeCardState.curWrongChar,
    onHintedCard: state.changeCardState.onHintedCard,
    wordCompleted: state.changeCardState.wordCompleted,
    currentWord: state.changeCardState.currentWord,
    audioIsPlaying: state.changeGeneralState.audioIsPlaying,
    romajiNotInDict: state.changeInputBox.romajiNotInDict,
    cardStateList: state.changeCardState.cardStateList,
    indexCurrentCard: state.changeCardState.indexCurrentCard,
    wrongCharList: state.changeCardState.wrongCharList,
    romajiList: state.changeCardState.romajiList,
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
      route: "register", // should be register
      // userInfo: {
      //   id: "a284d3ec-a941-4db0-acf2-b3531dab3f60",
      //   name: "newcomer",
      //   email: "newcomer@g.com",
      //   joined: "2020-10-14T19:27:16.707Z",
      // },
      userInfo: {
        id: "",
        name: "",
        email: "",
        joined: "",
      },
      currentWordInfo: null,
      openEndDialogue: false,
      isFetchingWord: false,
      checkedAudioAutoPlay: false,
      checkedEnableMessage: true,
      walkThroughEnabled: false,

      // introjs test
      initialStep: 0,
      steps1Enabled: false,
      steps2Enabled: false,
      steps3Enabled: false,
      steps4Enabled: false,
      transitionedFromSteps1ToSteps2: false,
      transitionedFromSteps2ToSteps3: false,
      transitionedFromSteps3ToSteps5: false,
      steps1: WALKTHROUGH_PART_1,
      steps2: WALKTHROUGH_PART_2,
      steps3: WALKTHROUGH_PART_3,
      steps4: WALKTHROUGH_PART_4,   
    };
    this.charInputRef = React.createRef();
    this.hintCardRef = React.createRef();
    this.wordCardRef = React.createRef();
  }

  componentDidMount = () => {
    this.requestNewWord(); // temporary
  };

  componentDidUpdate = (prevProps, prevState) => {
    // check if it's user's first time logging in
    if (this.state.route !== prevState.route
        && prevState.route === "register") {
      this.setState({ walkThroughEnabled: true })
      this.setState({ steps1Enabled: true })
      this.setState({ steps2Enabled: false })
      this.setState({ steps3Enabled: false })
      this.setState({ steps4Enabled: false })
    } 
    if (this.state.userInfo.id !== prevState.userInfo.id) {
      this.props.resetStore();
      this.requestNewWord();
    }
    if (this.state.route === "home") {
      setTimeout(() => {
        this.setState({ openEndDialogue: true });
      }, USER_TIME_LIMIT_IN_MINUTES * 60000);
    }
    if (this.state.steps1Enabled === prevState.steps1Enabled
        && !this.state.transitionedFromSteps1ToSteps2) {
      if (this.hintCardRef.current !== null) {
        this.setState({ steps1Enabled: false })
        this.setState({ steps2Enabled: true })
        this.setState({ transitionedFromSteps1ToSteps2: true })
      }
    }
    if (this.state.steps2Enabled === prevState.steps2Enabled
        && !this.state.transitionedFromSteps2ToSteps3
        && this.state.transitionedFromSteps1ToSteps2) {
      if (this.hintCardRef.current === null) {
        this.setState({ steps2Enabled: false })
        this.setState({ steps3Enabled: true })
        this.setState({ transitionedFromSteps2ToSteps3: true })
      }
    }
    if (this.state.steps3Enabled === prevState.steps3Enabled
        && !this.state.transitionedFromSteps3ToSteps4
        && this.state.transitionedFromSteps1ToSteps2
        && this.state.transitionedFromSteps2ToSteps3
        && this.props.currentWord !== "ママ"
        && this.props.currentWord !== prevProps.currentWord) {
      if (this.wordCardRef.current === null) {
        this.setState({ steps3Enabled: false })
        this.setState({ steps4Enabled: true })
        this.setState({ transitionedFromSteps3ToSteps4: true })
      }
    }
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

    LogRocket.identify(user_uid, {
      name: name,
      email: email,
      joined: joined,
    });
    console.log("userInfo", this.state.userInfo);
  };

  onRouteChange = (route) => {
    this.setState({ route: route });
  };

  parseJapaneseWord = (katakana_word) => {
    var charsToRead = [];
    for (const katakana_char of katakana_word) {
      var katakana_romaji = katakanaToRomaji[katakana_char] || "??";
      charsToRead.push({ 
        char: katakana_char, 
        romaji: katakana_romaji 
      });
    }
    return charsToRead;
  };

  updateCharScore = (user_uid, katakana_char, score) => {
    fetch(UPDATECHARSCORE_URL, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_uid: user_uid,
        char: katakana_char,
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
    this.setState({ isFetchingWord: true })
    const wordRequestTime = Date.now();
    console.log("Word requested at time:", wordRequestTime)
    this.setState({ wordRequestTimeStamp: wordRequestTime})

    fetch(GETWORD_URL, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_uid: this.state.userInfo.id,
      }),
    })
      .then((res) => res.json())
      .then((word) => {
        this.setState({ isFetchingWord: false })

        romajiList = this.parseJapaneseWord(word.vocab_kana).map(
          (kana_char) => kana_char.romaji
        );
        updateWord(word.vocab_kana, romajiList);
        setCurrentChar(word.vocab_kana.charAt(0), romajiList[0]);

        this.setState({ currentWordInfo: word });
        this.setState({ currentWord_unix_time: Date.now() });

        const word_audio = new Audio(
          `${MEDIA_BASE_URL_WORD}
          ${this.parseAudio(word.vocab_sound_local)}`
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

  focusInputBox = () => {
    this.charInputRef.current.formRef.current.focus();
  };

  onClickCard = (event) => {
    const kana_char = event.target.innerText;
    this.setState({ clickedJapChar: kana_char });

    // unclick
    if (this.state.clickedJapChar === kana_char) {
      this.setState({ clickedJapChar: "" });
    }
  };

  showHint = () => {
    // once user completed word, can review hint card
    if (this.props.wordCompleted && this.state.clickedJapChar) {
      return (
        <Grid item>
          <Paper elevation={1} />
          <Hint 
            currentHintedChar={this.state.clickedJapChar} 
            autoplayAudio={this.state.checkedAudioAutoPlay}
            ref={this.hintCardRef}
          />
        </Grid>
      );
    }
    if (this.props.onHintedCard) {
      return (
        <Grid item>
          <Paper elevation={1} />
          <Hint 
            currentHintedChar={this.props.currentJapChar} 
            autoplayAudio={this.state.checkedAudioAutoPlay}
            ref={this.hintCardRef}
          />
        </Grid>
      );
    }
  };

  displayWordInfo = () => {
    if (this.props.wordCompleted) {
      return (
        <Grid item>
          <WordCard
            wordInfo={this.state.currentWordInfo}
            word_audio_duration={this.state.word_audio_duration}
            autoplayAudio={this.state.checkedAudioAutoPlay}
            ref={this.wordCardRef}
          />
        </Grid>
      );
    } else {
      return null;
    }
  };

  getKeyByValue = (object, value) => {
    return Object.keys(object).find((key) => object[key] === value);
  };

  randomItem = (aList) => {
    return aList[Math.floor(Math.random() * aList.length)];
  }

  displayMessage = () => {
    const {
      onIncorrectCard,
      onHintedCard,
      curWrongChar,
      wordCompleted,
      audioIsPlaying,
      romajiNotInDict,
      currentJapChar,
      cardStateList,
      indexCurrentCard,
      wrongCharList,
      romajiList,
    } = this.props;
    if (this.state.walkThroughEnabled) {
      return "..."
    }
    if (audioIsPlaying) {
      return `Playing audio...`;
    }
    if (onIncorrectCard) {
      return (romajiNotInDict 
        ? `${curWrongChar} does not exist in the Japanese alphabet.`
        : `${curWrongChar} corresponds to ${this.getKeyByValue(katakanaToRomaji, curWrongChar)}, not ${currentJapChar}.`
      );
    } else if (onHintedCard) {
      return "Press spacebar again to continue."
    } else if (romajiList[indexCurrentCard] in wrongCharList) {
      return "Press spacebar to learn the character if you're stuck."
    } else if (indexCurrentCard > 0 
      && indexCurrentCard < cardStateList.length
      && cardStateList[indexCurrentCard - 1] === "correct") {
        return this.randomItem(listOfSoftPraises);
    } else if (wordCompleted && !audioIsPlaying) {
      const cardStateSet = new Set(cardStateList);
      if (cardStateSet.size === 1 && cardStateSet.has("correct")) {
        return this.randomItem(listOfPraises);
      } else {
        return "You can click on a character to review its mnemonic card.";
      }
    } else {
      // return `I will be giving you feedback as you use the app.`;
      return `...`;
    }
  };

  setButtonText = () => {
    const {
      onIncorrectCard,
      onHintedCard,
      wordCompleted,
      audioIsPlaying,
    } = this.props;

    if (onIncorrectCard) {
      return "Try Again";
    } else if (onHintedCard && !audioIsPlaying) {
      return "Next Character";
    } else if (wordCompleted && !audioIsPlaying) {
      return "Next Word";
    } else if (!onHintedCard && !wordCompleted) {
      return "Learn Character";
    } else {
      return "";
    }
  };

  displayLoadingPopup = () => {
    console.log("Debug", this.state.isFetchingWord)
    if (this.state.isFetchingWord) {
      const curTime = Date.now()
      if (curTime - this.state.wordRequestTimeStamp > 4000) {
        console.log("word request is taking more than 4 sec")
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  handleAudioAutoplaySwitch = (event) => {
    this.setState(
      { checkedAudioAutoPlay: !this.state.checkedAudioAutoPlay }
    );
  }

  handleEnableMessageSwitch = () => {
    this.setState(
      { checkedEnableMessage: !this.state.checkedEnableMessage }
    );
  }

  onExitIntro1 = () => {}
  onExitIntro2 = () => {
    this.setState(() => ({ steps2Enabled: false }));
  }
  onExitIntro3 = () => {}
  onExitIntro4 = () => {
    this.setState({walkThroughEnabled: false });
  }
  
  handleClickWalkthrough = () => {
    this.setState({ steps1Enabled: true });
    this.setState({ steps2Enabled: false });
    this.setState({ steps3Enabled: false });
    this.setState({ steps4Enabled: false });
    this.setState({ walkThroughEnabled: true });
    console.log("WALKTHROUGH", this.charInputRef.current.formRef.current)
    this.props.resetStore();
    this.requestNewWord();
  }

  onBeforeChange1 = (nextStepIndex) => {
    if (nextStepIndex) {
      // select dynamically created elements
      this.steps1.updateStepElement(nextStepIndex);
    }
    if (nextStepIndex === 4) {
      if (!this.hintCardRef.current) {
        return false;
      } else {
        this.steps1.updateStepElement(nextStepIndex);
      }
    }
  }
  onBeforeChange2 = (nextStepIndex) => {
    if (nextStepIndex) {
      this.steps2.updateStepElement(nextStepIndex);
    }
    if (nextStepIndex === 3) {
      if (this.hintCardRef.current !== null) {
        return false;
      } else {
        this.steps2.updateStepElement(nextStepIndex);
      }
    }
  }
  onBeforeChange3 = (nextStepIndex) => {
    if (nextStepIndex) {
      this.steps3.updateStepElement(nextStepIndex);
    }
    if (nextStepIndex === 3) {
      if (this.wordCardRef.current !== null) {
        return false;
      } else {
        this.steps3.updateStepElement(nextStepIndex);
      }
    }
  }
  onBeforeChange4 = (nextStepIndex) => {
    if (nextStepIndex) {
      this.steps4.updateStepElement(nextStepIndex);
    }
  }
  
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
      case "katakanaChart":
        return (
          <div className="progress-flex-container">
            <div className="progress-flex-item1">
              <NavBar
                onRouteChange={this.onRouteChange}
                currentTab="katakanaChart"
              />
            </div>
            <div className="progress-flex-item2">
              <KatakanaChart user_uid={this.state.userInfo.id} />
            </div>
            <Footer />
          </div>
        )
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
        const {
          steps1Enabled,
          steps2Enabled,
          steps3Enabled,
          steps4Enabled,
          steps1,
          steps2,
          steps3,
          steps4,
          initialStep
        } = this.state;
        const generalStepsOptions = {
          showStepNumbers: false,
          hidePrev: true,
          hideNext: true,
          exitOnOverlayClick: false,
        };
        return (
          <div className="page-container" style={{ position: "relative" }}>
            <LoadingPopup isOpen={this.displayLoadingPopup()}/>
            <Steps
              enabled={steps1Enabled && this.state.walkThroughEnabled}
              steps={steps1}
              initialStep={initialStep}
              onExit={this.onExitIntro1}
              options={generalStepsOptions}
              ref={steps => (this.steps1 = steps)}
              onBeforeChange={this.onBeforeChange1}
            />
            <Steps
              enabled={steps2Enabled && this.state.walkThroughEnabled}
              steps={steps2}
              initialStep={initialStep}
              onExit={this.onExitIntro2}
              options={generalStepsOptions}
              ref={steps => (this.steps2 = steps)}
              onBeforeChange={this.onBeforeChange2}
            />
            <Steps
              enabled={steps3Enabled && this.state.walkThroughEnabled}
              steps={steps3}
              initialStep={initialStep}
              onExit={this.onExitIntro3}
              options={generalStepsOptions}
              ref={steps => (this.steps3 = steps)}
              onBeforeChange={this.onBeforeChange3}
            />
            <Steps
              enabled={steps4Enabled && this.state.walkThroughEnabled}
              steps={steps4}
              initialStep={initialStep}
              onExit={this.onExitIntro4}
              options={generalStepsOptions}
              ref={steps => (this.steps4 = steps)}
              onBeforeChange={this.onBeforeChange4}
            />
            <Dialog
              open={this.state.openEndDialogue}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Time's Up!"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <p>
                    {`You have used the app for ${USER_TIME_LIMIT_IN_MINUTES} minute. Please click the link
                    below to take a short test that will assess your Katakana
                    knowledge. Thank you for using the app!`}
                  </p>
                  <a
                    href="https://harvard.az1.qualtrics.com/jfe/form/SV_2aZI7SwLfhp5nxj"
                    className="survey-link"
                  >
                    {"https://harvard.az1.qualtrics.com/jfe/form/SV_2aZI7SwLfhp5nxj"}
                  </a>
                </DialogContentText>
              </DialogContent>
            </Dialog>

            <div className="content-wrap">
              <NavBar 
                onRouteChange={this.onRouteChange} 
                currentTab="home"
                handleClickWalkthrough={this.handleClickWalkthrough}
              />
              <div className="message-bar">
                <MessageBar 
                  userName={this.state.userInfo.name}
                  message={this.displayMessage()}
                  displayHelpMessages={this.state.checkedEnableMessage}
                />
              </div>

              <FormControlLabel
                className="audio-control"
                label="Autoplay Audio"
                labelPlacement="start"
                control={
                  <Switch 
                    disabled
                    checked={this.state.checkedAudioAutoPlay}
                    onChange={this.handleAudioAutoplaySwitch}
                    name="autoplay-audio" 
                    color="primary"
                  />
                }
              >
              </FormControlLabel>
              <FormControlLabel
                className="message-control"
                label="Help Message"
                labelPlacement="start"
                control={
                  <Switch 
                    checked={this.state.checkedEnableMessage}
                    onChange={this.handleEnableMessageSwitch}
                    name="enable-message" 
                    color="primary"
                  />
                }
              >
              </FormControlLabel>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <div className="main-area">
                  <Grid item className="inputbox-div">
                    <OutsideAlerter focusInputBox={this.focusInputBox}>
                      <CharInput
                        updateCharScore={this.updateCharScore}
                        updateWordScore={this.updateWordScore}
                        getKeyByValue={this.getKeyByValue}
                        user_uid={this.state.userInfo.id}
                        ref={this.charInputRef}
                        setClick={(click) => (this.clickChild = click)}
                        steps1Enabled={this.state.steps1Enabled}
                      />
                    </OutsideAlerter>
                  </Grid>
                  <Grid item className="japanese-word-area">
                    <CharList
                      charsToRead={this.parseJapaneseWord(currentWord)}
                      onClickCard={this.onClickCard}
                      clickedJapChar={this.state.clickedJapChar}
                    />
                  </Grid>
                  <Grid item className="main-button"> 
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
                      <Button
                        disabled                       
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
                        {"Got it"}
                      </Button>
                    )}
                  </Grid>
                  <Grid item className="card-area">
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                      spacing={2}
                    >                      
                      {this.showHint()}
                      {this.displayWordInfo()}
                    </Grid>                  
                  </Grid>
                </div>
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
