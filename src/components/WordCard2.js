import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Music from "./Music";
import { MEDIA_BASE_URL_SENTENCE, MEDIA_BASE_URL_WORD } from "../constants";
import Divider from "@material-ui/core/Divider";
import "../scss/components/WordCard.scss";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function WordCard2({ wordInfo, word_audio_duration, autoplayAudio }) {
  const classes = useStyles();
  var el = document.createElement("html");
  el.innerHTML = "<b>bolded text</b>";

  var katakana_word = null;
  var word_meaning = null;
  var word_pos = null;

  if (Object.keys(wordInfo).includes("word")) {
    katakana_word = wordInfo.word;
    word_meaning = wordInfo.meaning;
    word_pos = wordInfo.part_of_speech;
  } else {
    katakana_word = wordInfo.vocab_kana;
    word_meaning = wordInfo.vocab_meaning;
    word_pos = wordInfo.vocab_pos;
  }


  return (
    <Card className={`${classes.root} word-card `}>
      <CardContent>
        <Typography 
          variant="h5" 
          component="h2"
        >
          <div className="wordcard-kana">
            {katakana_word}
          </div>
        </Typography>

        <Divider style={{ marginTop: "calc(5px + 0.5vh)" }} />
        <Typography
          className={`${classes.title}`}
          color="textSecondary"
          gutterBottom
        >
          <div className="wordcard-subtext subtext-meaning">Word Meaning</div>
        </Typography>
        <h3 className="bolded-style">{word_meaning}</h3>
        <Divider style={{ marginTop: "calc(5px + 0.5vh)" }} />
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          <div className="wordcard-subtext subtext-pos">Part of Speech</div>
        </Typography>
        <Typography variant="h3" component="h4">
          <div className="wordcard-text">
            {word_pos}
          </div>
        </Typography>
      
      </CardContent>
    </Card>
  );
}
