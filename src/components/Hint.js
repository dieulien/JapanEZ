import React from "react";
import { mnemonics } from "../mnemonics.js";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { katakanaHint } from "../jap-char";

//original component
// const Hint = () =>{
//     return(
//         <div className = "mw5 center bg-white br3 pa3 ba b--black-10">
//             <img alt ='character mnemonic' width="200" height="200" src=''/>
//             <div>
//                 <hr className="mw3 bb bw1 b--black-10"></hr>
//                 <p>This will be a brief explanation</p>
//             </div>
//         </div>
//     );
// }

const useStyles = makeStyles({
  root: {
    maxWidth: 320,
  },
  media: {
    height: 200,
  },
});

export default function Hint({ currentHintedChar }) {
  const classes = useStyles();

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
          <Typography gutterBottom variant="h5" component="h2">
            {currentHintedChar}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {katakanaHint[currentHintedChar].shortHint}
          </Typography>
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
