import React from "react";
import "../scss/containers/App.scss";
import "../scss/components/SmallChar.scss";
import { makeStyles } from "@material-ui/core/styles";
import zIndex from "@material-ui/core/styles/zIndex";

// links below shows how to transition between gradient background
// https://medium.com/@dave_lunny/animating-css-gradients-using-only-css-d2fd7671e759

const useStyles = makeStyles({
  tinyCard: {
    cursor: "pointer",
    background: (props) => {
      return props.correctPercent === 0 && props.hintedPercent === 0
        ? "#d6d6d6"
        : `linear-gradient(0deg, green 0% ${props.correctPercent}%, #f2b50c ${props.correctPercent}% ${props.hintedPercent}%)`;
    },
    borderRadius: "0.75rem",
    fontSize: "3rem",
    padding: "1rem",
    color: "white",
    zIndex: 100,
    position: "relative",
    display: "inline-block",
    // animation: `$myEffect 1s`,
    // animationFillMode: "forwards",
    "&:before": {
      background: "#1cb0f6",
      borderRadius: "inherit",
      opacity: 0,
      zIndex: -100,
      transition: "opacity 1s",
      width: "100%",
      top: 0,
      left: 0,
      position: "absolute",
      height: "100%",
      display: "block",
      content: '""',
    },
    "&:hover": {
      "&:before": {
        opacity: 1,
      },
    },
  },
  "@keyframes myEffect": {
    "0%": { background: "white" },
    "100%": { background: "#d6d6d6" },
  },
});

function SmallChar(props) {
  const { correctPercent, hintedPercent, char } = props;
  const classes = useStyles(props);
  var background = "";
  if (correctPercent === 0 && hintedPercent === 0) {
    background = `#d6d6d6`;
  } else {
    background = `linear-gradient(0deg, green 0% ${correctPercent}%, #f2b50c ${correctPercent}% ${hintedPercent}%)`;
  }

  return (
    <div className={`${classes.tinyCard}`}>
      <b>{char}</b>
    </div>
  );
}

export default SmallChar;
