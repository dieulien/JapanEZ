import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Music from "./Music";
import { katakanaToRomaji, katakanaHint } from "../jap-char";
import { MEDIA_BASE_URL_CHAR } from "../constants";

const useStyles = makeStyles({
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

export default function Hint({ currentHintedChar }) {
  console.log("CURRENT HINT CHAR", currentHintedChar);
  const classes = useStyles();
  const romaji = katakanaToRomaji[currentHintedChar];
  const sentenceFragments = parseoutUnderlineText(
    katakanaHint[currentHintedChar].shortHint
  );
  const modified_romaji = romaji === "nn" ? "n" : romaji;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          component="img"
          alt="Hint for character"
          image={katakanaHint[currentHintedChar].imageLink}
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
            audioLink={MEDIA_BASE_URL_CHAR + modified_romaji + ".mp3"}
            delay={0}
            noStoreUpdateWhenEnded={false}
          />
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
}
