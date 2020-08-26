import React from "react";
import "../scss/components/SmallChar.scss";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";

// links below shows how to transition between gradient background
// https://medium.com/@dave_lunny/animating-css-gradients-using-only-css-d2fd7671e759

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  cardBG: {
    background: (props) => {
      return props.correctPercent === 0 && props.hintedPercent === 0
        ? "#d6d6d6"
        : `linear-gradient(0deg, green 0% ${props.correctPercent}%, #f2b50c ${props.correctPercent}% ${props.hintedPercent}%)`;
    },
  },
}));

function SmallChar(props) {
  const { char, correctNum, hintedNum } = props;
  const classes = useStyles(props);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <div className={`noselect flipcard`} id={id} onClick={handleClick}>
        <div className="flipcard-content">
          <div className={`flipcard-front ${classes.cardBG}`}>
            <span>
              <b>{char}</b>
            </span>
          </div>
          <div className="flipcard-back">
            <p>
              {correctNum} <span className="dot correct-color"></span>
            </p>
            <p>
              {hintedNum} <span className="dot hinted-color"></span>
            </p>
          </div>
        </div>
      </div>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography className={classes.typography}>
          {`${correctNum} correct, ${hintedNum} hinted`}
        </Typography>
      </Popover>
    </div>
  );
}

export default SmallChar;
