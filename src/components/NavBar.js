import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";

const NavBar = ({ onRouteChange }) => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit">
            Learn Hiragana Non-stop
          </Typography>
          <Button
            color="inherit"
            onClick={() => onRouteChange("signin")}
            className="f3 link dim black underline pa3 pointer"
          >
            Signout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default NavBar;
