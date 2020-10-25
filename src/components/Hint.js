import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Music from "./Music";
import Divider from "@material-ui/core/Divider";
import { katakanaToRomaji, katakanaHint } from "../jap-char";
import { MEDIA_BASE_URL_CHAR } from "../constants";
import "../scss/components/Hint.scss";
import CardActionArea from '@material-ui/core/CardActionArea';


const parseoutUnderlineText = (sentence) => {
  // replace <b> and </b> with comma
  sentence = sentence.replace(/<\/?u>/g, ",");
  return sentence.split(",");
};

class Hint extends React.Component {
  constructor(props) {
    super(props);
    this.audioComponent = React.createRef();
  }
  render() {
    const romaji = katakanaToRomaji[this.props.currentHintedChar];
    const sentenceFragments = parseoutUnderlineText(
      katakanaHint[this.props.currentHintedChar].shortHint
    );
    const modified_romaji = romaji === "n'" ? "n" : romaji;
    const audioLink = MEDIA_BASE_URL_CHAR + modified_romaji + ".mp3";

    // https://stackoverflow.com/questions/37949981/call-child-method-from-parent
    return (
      <Card 
        className={`hint-card`} 
        onClick={this.onClickHandler}
      >
        <CardActionArea onClick={() => this.triggerAudioComponent()}>
          <Music
            audioLink={audioLink}
            delay={0}
            noStoreUpdateWhenEnded={false}
            autoplay={this.props.autoplayAudio}
            bindMethod={(childMethod) => this.triggerAudioComponent = childMethod}
          />
          <div className="hint-card-content">
            <h3 className="hint-card-romaji">{romaji}</h3>
            <Divider />
            <div className="image-div">
              <img
                src={`${katakanaHint[this.props.currentHintedChar].imageLink}`}
                className={`hint-card-image`}
                alt="Hint Card"
              />
            </div>
            <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
              <Typography variant="body2" component="p">
                <div className="hint-text">
                  {sentenceFragments[0]}
                  <u>{sentenceFragments[1]}</u>
                  {sentenceFragments[2]}
                </div>
              </Typography>
            </CardContent>
          </div>
        </CardActionArea>
      </Card>
    );
  }
}

export default Hint;
