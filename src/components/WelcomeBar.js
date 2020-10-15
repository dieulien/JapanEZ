import React from "react";
import { Paper } from "@material-ui/core";
import "../scss/components/WelcomeBar.scss";

const WelcomeBar = ({ userName, message }) => {
  return (
    <div className="container" style={{ color: "#5D5D5D" }}>
      <Paper elevation={0} />
      <div className="welcome-text">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default WelcomeBar;
