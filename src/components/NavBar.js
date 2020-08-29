import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "../scss/components/NavBar.scss";

// icons
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import HomeIcon from "@material-ui/icons/Home";
import AssessmentIcon from "@material-ui/icons/Assessment";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = ({ onRouteChange, currentTab }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            color="secondary"
            className={classes.title}
            align="left"
          >
            <div className="navbar-title">Japanese vs. English words</div>
          </Typography>
          <Button
            variant={currentTab === "home" ? "outlined" : "text"}
            color="secondary"
            onClick={() => onRouteChange("home")}
            startIcon={<HomeIcon />}
          >
            <div className="navbar-button-text">Home</div>
          </Button>
          <Button
            variant={currentTab === "progress" ? "outlined" : "text"}
            color="secondary"
            onClick={() => onRouteChange("progress")}
            startIcon={<AssessmentIcon />}
          >
            <div className="navbar-button-text">Progress</div>
          </Button>
          <Button
            color="secondary"
            variant={currentTab === "signout" ? "outlined" : "text"}
            onClick={() => onRouteChange("signin")}
            className="nav-button"
            startIcon={<ExitToAppIcon />}
          >
            <div className="navbar-button-text">Signout</div>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default NavBar;
