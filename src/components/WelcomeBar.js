import React from "react";
import { Paper } from "@material-ui/core";
import "../scss/components/WelcomeBar.scss";

const WelcomeBar = ({ userName }) => {
  return (
    <div className="container" style={{ color: "#5D5D5D" }}>
      <Paper elevation={0} />
      <div className="welcome-text">
        <p>Welcome, {userName}! </p>
        <ul>
          <li>
            Type the character as fast as you can if you've already known the
            character
          </li>
          <li>
            Tips: You can press SPACE to move on instead of clicking on the main
            Button
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WelcomeBar;
