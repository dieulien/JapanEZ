import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "../scss/components/NavBar.scss";

// make help dialog
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

// icons
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import AssessmentOutlinedIcon from "@material-ui/icons/AssessmentOutlined";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import TranslateOutlinedIcon from '@material-ui/icons/TranslateOutlined';

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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            <div className="navbar-title">JapanEZ</div>
          </Typography>
          <Button
            variant="text"
            color="secondary"
            onClick={handleClickOpen}
            startIcon={<HelpOutlineOutlinedIcon />}
          >
            <div className="navbar-button-text">Help</div>
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Instruction"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <p>
                  In this app, you will learn Japanese Katakana alphabet. At
                  each iteration, the app will display all the Katakana
                  characters that make up a certain Japanese word.
                </p>
                <p>If you know the katakana, simply type romaji </p>
                <p>If you don't know it, press SPACE to learn the romaji. </p>
                <p>If your input is incorrect, press SPACE to retry.</p>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary" autoFocus>
                Close
              </Button>
            </DialogActions>
          </Dialog>
          <Button
            variant={currentTab === "home" ? "outlined" : "text"}
            color="secondary"
            onClick={() => onRouteChange("home")}
            startIcon={<HomeOutlinedIcon />}
          >
            <div className="navbar-button-text">Home</div>
          </Button>
          <Button
            variant={currentTab === "progress" ? "outlined" : "text"}
            color="secondary"
            onClick={() => onRouteChange("progress")}
            startIcon={<AssessmentOutlinedIcon />}
          >
            <div className="navbar-button-text">Progress</div>
          </Button>
          <Button
            variant={currentTab === "katakanaChart" ? "outlined" : "text"}
            color="secondary"
            onClick={() => onRouteChange("katakanaChart")}
            startIcon={<TranslateOutlinedIcon />}
          >
            <div className="navbar-button-text">Katakana</div>
          </Button>
          <Button
            color="secondary"
            variant={currentTab === "signout" ? "outlined" : "text"}
            onClick={() => onRouteChange("signin")}
            className="nav-button"
            startIcon={<ExitToAppOutlinedIcon />}
          >
            <div className="navbar-button-text">Signout</div>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default NavBar;
