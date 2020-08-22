import React from "react";
import SmallChar from "../components/SmallChar.js";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { setNewWordTime } from "../actions";
import { katakanaToRomaji } from "../jap-char";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

class SmallCharList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const charsArrayDisplay = Object.keys(katakanaToRomaji).map((kana, idx) => {
      if (kana !== "clearBuffer") {
        return (
          <Grid item key={idx}>
            <SmallChar char={kana} key={idx} />
          </Grid>
        );
      }
    });

    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing="2"
      >
        {charsArrayDisplay}
      </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmallCharList);
