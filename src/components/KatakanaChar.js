import React from "react";
import { katakanaToRomaji } from "../jap-char"
import { makeStyles } from "@material-ui/core/styles";
import "../scss/components/KatakanaChar.scss";
import { PRIMARYCOLOR } from "../constants";
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
  cardBG: {
    background: (props) => {
      return props.isEncountered ? PRIMARYCOLOR : "#d6d6d6"
    }
  }
}))

const KatakanaChar = (props) => {
  const { char, isLoading } = props;
  const classes = useStyles(props);

  return (
    <div>
      { isLoading ? (
        <Skeleton 
          variant="wave" 
          width={75} 
          height={80} 
          style={{ borderRadius: "15px"}}
        />
      ) : (
        <div>
          <div className={`noselect flipcard2`}>
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
      )}
    </div>
  );
}

export default KatakanaChar;