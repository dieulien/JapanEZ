import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "../scss/components/NavBar.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = ({ onRouteChange }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.title}
            align="left"
          >
            <div className="navbar-title">Japanese vs. English words</div>
          </Typography>
          <Button color="inherit" onClick={() => onRouteChange("home")}>
            <div className="navbar-button-text">Home</div>
          </Button>
          <Button color="inherit" onClick={() => onRouteChange("progress")}>
            <div className="navbar-button-text">Progress</div>
          </Button>
          <Button
            color="inherit"
            onClick={() => onRouteChange("signin")}
            className="nav-button"
          >
            <div className="navbar-button-text">Signout</div>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default NavBar;
