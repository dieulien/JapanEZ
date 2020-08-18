import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Music from "./Music";
import { MEDIA_BASE_URL_SENTENCE, MEDIA_BASE_URL_WORD } from "../constants";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const parseoutBoldText = (sentence) => {
  // replace <b> and </b> with comma
  sentence = sentence.replace(/<\/?b>/g, ",");
  return sentence.split(",");
};

export default function OutlinedCard({ wordInfo, word_audio_duration }) {
  const classes = useStyles();

  var el = document.createElement("html");
  el.innerHTML = "<b>bolded text</b>";
  const sentenceSegments = parseoutBoldText(wordInfo.sentence_expression);

  const parseAudio = (audio_string) => {
    return audio_string.slice(7, audio_string.length - 1);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Word Meaning
        </Typography>
        <Typography variant="h5" component="h2">
          {wordInfo.vocab_meaning} ({wordInfo.vocab_pos})
          <Music
            audioLink={`${MEDIA_BASE_URL_WORD}${parseAudio(
              wordInfo.vocab_sound_local
            )}`}
            delay={0}
            noStoreUpdateWhenEnded={true}
          />
        </Typography>
        <br></br>

        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Sample Sentence
        </Typography>
        <Typography variant="h5" component="h2">
          {sentenceSegments[0]}
          <b>
            <u>{sentenceSegments[1]}</u>
          </b>
          {sentenceSegments[2]}
          <Music
            audioLink={`${MEDIA_BASE_URL_SENTENCE}${parseAudio(
              wordInfo.sentence_sound_local
            )}`}
            delay={word_audio_duration * 1000 + 500}
            noStoreUpdateWhenEnded={false}
          />
        </Typography>
        <br></br>

        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Sentence Meaning
        </Typography>
        <Typography variant="body2" component="p">
          {wordInfo.sentence_meaning}
        </Typography>
      </CardContent>
    </Card>
  );
}
