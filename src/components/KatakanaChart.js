import React from "react";
import LoadingPopup from "./LoadingPopup";
import { GETCHARSCORE_URL } from "../constants";
import { limitedKatakanaList } from "../jap-char";
import KatakanaChar from "./KatakanaChar";
import { Grid } from "@material-ui/core";
import "../scss/components/KatakanaChar.scss";

class KatakanaChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      charResultList: {},
      isLoading: false,
    };
  }

  requestGetCharScore = () => {
    fetch(GETCHARSCORE_URL, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_uid: this.props.user_uid,
      })
    })
      .then((res) => res.json())
      .then((charResultList) => {
        this.setState({ charResultList: charResultList });
      })
      .catch((err) => {
        console.log("Error in fetching data about characters' familiarity", err)
      });
  };

  componentDidMount = () => {
    this.requestGetCharScore();
  }

  render() {
    var katakanaArray = null;
    var kana_filteredResultList = null;

    if (Object.keys(this.state.charResultList).length === 0) {
      // return <LoadingPopup isOpen={true} />
      // if haven't receive data
      katakanaArray = limitedKatakanaList.map((kana, idx) => {
        return (
          <Grid item key={idx}>
            <KatakanaChar
              char={kana}
              key={idx}
              isEncountered={false}
              isLoading={true}
            />
          </Grid>
        );
      });
    } else {
      katakanaArray = limitedKatakanaList.map((kana, idx) => {
        kana_filteredResultList = this.state.charResultList[kana].filter(resultType => resultType !== "incorrect")
        return (
          <Grid item key={idx}>
            <KatakanaChar
              char={kana}
              key={idx}
              isEncountered={kana_filteredResultList.length > 0}
              isLoading={false}
            />
          </Grid>
        );
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
          {katakanaArray}
        </Grid>
      </div>
    );
  };

}

export default KatakanaChart;