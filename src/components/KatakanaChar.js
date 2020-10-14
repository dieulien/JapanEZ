import React from "react";
import { katakanaToRomaji } from "../jap-char"
import { makeStyles } from "@material-ui/core/styles";
import "../scss/components/KatakanaChar.scss";


const useStyles = makeStyles((theme) => ({
  cardBG: {
    background: (props) => {
      return props.isEncountered ? "#1cb0f6" : "#d6d6d6"
    }
  }
}))

const KatakanaChar = (props) => {
  const { char } = props;
  const [anchorElement, setAnchorElement] = React.useState(null)
  const classes = useStyles(props);

  const handleClick = (event) => {
    setAnchorElement(event.currentTarget);
  };

  return (
  <div>
    <div className={`noselect flipcard2`} onClick={handleClick}>
      <div className="flipcard-content2">
        <div className={`flipcard-front2 ${classes.cardBG}`}>
          <span>
            <b>{char}</b>
          </span>
        </div>
        <div className={`flipcard-back2 ${classes.cardBG}`}>
          <span>
            <b>{katakanaToRomaji[char]}</b>
          </span>
        </div>
      </div>
    </div>
  </div>
  );
}

export default KatakanaChar;