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
    maxWidth: 200,
  },
});

export default function Hint() {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="200"
            image="https://images.squarespace-cdn.com/content/v1/5b3df7a2e2ccd1a90cd980f8/1586264092269-PH3K138MDDNEYO3WN8JA/ke17ZwdGBToddI8pDm48kEpVg-ILAPna1wRh-xAJ9fRZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpwEv36x-EUL2-BSQ5feDhwGCbXuJBFqZ-erYzVouT8yOb9TwqchglLQOCYTRn7ZGxI/Fran+Wrigley+Japanese+Lessons+Learn+Japanese+Online+Learn+Hiragana+Katakana+Mnemonics+4.jpeg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Lizard
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              This will be a brief explanation
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
      <p>Press Enter To Continue</p>
    </div>
  );
}
