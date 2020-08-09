import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

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
    <div className = {classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.title}>
            Learn Katakana Non-stop
          </Typography>
          <Button
            color="inherit"
            onClick={() => onRouteChange("signin")}
          >
            Signout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default NavBar;
