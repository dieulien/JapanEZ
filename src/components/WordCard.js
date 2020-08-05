import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

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

export default function OutlinedCard({ wordInfo }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

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
          {wordInfo.vocab_meaning}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {wordInfo.sentence_kana}
        </Typography>
        <Typography variant="body2" component="p">
          {wordInfo.sentence_meaning}
        </Typography>
      </CardContent>
    </Card>
  );
}
