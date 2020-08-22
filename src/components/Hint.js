import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Music from "./Music";
import { katakanaToRomaji, katakanaHint } from "../jap-char";
import { MEDIA_BASE_URL_CHAR } from "../constants";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    maxWidth: 320,
  },
  media: {
    height: 200,
  },
});

const parseoutUnderlineText = (sentence) => {
  // replace <b> and </b> with comma
  sentence = sentence.replace(/<\/?u>/g, ",");
  return sentence.split(",");
};

class Hint extends React.Component {
  render() {
    const { classes } = this.props;
    const romaji = katakanaToRomaji[this.props.currentHintedChar];
    const sentenceFragments = parseoutUnderlineText(
      katakanaHint[this.props.currentHintedChar].shortHint
    );
    const modified_romaji = romaji === "nn" ? "n" : romaji;
    const audioLink = MEDIA_BASE_URL_CHAR + modified_romaji + ".mp3";
    return (
      <Card className={classes.root} onClick={this.onClickHandler}>
        <CardMedia
          className={classes.media}
          component="img"
          alt="Hint for character"
          image={katakanaHint[this.props.currentHintedChar].imageLink}
          title="Hint for character"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {sentenceFragments[0]}
            <u>{sentenceFragments[1]}</u>
            {sentenceFragments[2]}
          </Typography>
          <br></br>
          <Music
            audioLink={audioLink}
            delay={0}
            noStoreUpdateWhenEnded={false}
          />
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Hint);
