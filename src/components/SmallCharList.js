import React from "react";
import SmallChar from "../components/SmallChar.js";
import { Grid } from "@material-ui/core";
import { katakanaToRomaji, limitedKatakanaList } from "../jap-char";
import { GETCHARSCORE_URL } from "../constants";
import "../scss/components/SmallChar.scss";
import LoadingPopup from "./LoadingPopup";

class SmallCharList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      charResultList: {},
    };
  }

  requestGetCharScore = () => {
    fetch(GETCHARSCORE_URL, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_uid: this.props.user_uid,
      }),
    })
      .then((res) => res.json())
      .then((charResultList) => {
        this.setState({ charResultList: charResultList });
      })
      .catch((err) => {
        console.log("Error in getting characters' familiarity", err);
      });
  };

  componentDidMount = () => {
    this.requestGetCharScore();
  };

  computeCorrectPercentage = (resultList) => {
    var total_correct = 0;
    if (resultList.length === 0) {
      return -1;
    }
    resultList.forEach((result) => {
      if (result === "correct") total_correct += 1;
    });
    return Math.round((total_correct / resultList.length) * 100);
  };

  computeCorrectNum = (resultList) => {
    return resultList.length === 0
      ? 0
      : resultList.reduce((acc, val) => {
          if (val === "correct") {
            acc += 1;
          }
          return acc;
        }, 0);
  };

  render() {
    var charsArrayDisplay = null;

    if (Object.keys(this.state.charResultList).length === 0) {
      // return <LoadingPopup isOpen={true} />;
      charsArrayDisplay = limitedKatakanaList.map((kana, idx) => {
          return (
            <Grid item key={idx}>
              <SmallChar
                char={kana}
                key={idx}
                hintedPercent={0}
                correctPercent={0}
                correctNum={0}
                hintedNum={0}
                isLoading={true}
              />
            </Grid>
          ); 
      });
    } else {
      charsArrayDisplay = limitedKatakanaList.map((kana, idx) => {
        if (kana !== "clearBuffer") {
          var correctPercentage = 0;
          var hintedPercentage = 0;
          var correctNum = this.computeCorrectNum(
            this.state.charResultList[kana]
          );
          var hintedNum = this.state.charResultList[kana].length - correctNum;
  
          if (Object.keys(this.state.charResultList).length > 0) {
            correctPercentage = this.computeCorrectPercentage(
              this.state.charResultList[kana]
            );
            hintedPercentage = 100 - correctPercentage;
            if (correctPercentage === -1) {
              correctPercentage = 0;
              hintedPercentage = 0;
            }
          }
          return (
            <Grid item key={idx}>
              <SmallChar
                char={kana}
                key={idx}
                hintedPercent={hintedPercentage}
                correctPercent={correctPercentage}
                correctNum={correctNum}
                hintedNum={hintedNum}
                isLoading={false}
              />
            </Grid>
          );
        } else {
          return null;
        }
      });
    }

    return (
      <div className="characters-list">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing="2"
        >
          {charsArrayDisplay}
        </Grid>
      </div>
    );
  }
}

export default SmallCharList;
