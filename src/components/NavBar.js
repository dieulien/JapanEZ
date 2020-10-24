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
import DirectionsOutlinedIcon from '@material-ui/icons/DirectionsOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = (props) => {
  const classes = useStyles();
  const { onRouteChange, currentTab, handleClickWalkthrough } = props;

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
          {/* <Button
            className="nav-button-walkthrough"
            // disabled
            variant="text"
            color="secondary"
            onClick={handleClickWalkthrough}
            startIcon={<DirectionsOutlinedIcon />}
          >
            <div className="navbar-button-text">Walkthrough</div>
          </Button> */}
          <Button
            variant="text"
            color="secondary"
            onClick={handleClickOpen}
            startIcon={<HelpOutlineOutlinedIcon />}
          >
            <div className="navbar-button-text">Help</div>
          </Button>
          <Button
            className="nav-button-home"
            variant={currentTab === "home" ? "outlined" : "text"}
            color="secondary"
            onClick={() => onRouteChange("home")}
            startIcon={<HomeOutlinedIcon />}
          >
            <div className="navbar-button-text">Home</div>
          </Button>
          <div className="nav-button-chart">
            <Button
              className="nav-button-progress"
              variant={currentTab === "progress" ? "outlined" : "text"}
              color="secondary"
              onClick={() => onRouteChange("progress")}
              startIcon={<AssessmentOutlinedIcon />}
            >
              <div className="navbar-button-text">Progress</div>
            </Button>
            <Button
              className="nav-button-katakanaChart"
              variant={currentTab === "katakanaChart" ? "outlined" : "text"}
              color="secondary"
              onClick={() => onRouteChange("katakanaChart")}
              startIcon={<TranslateOutlinedIcon />}
            >
              <div className="navbar-button-text">Katakana</div>
            </Button>
          </div>
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
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Instruction"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <p>Your task is to type the pronunciation of Japanese words and learn Japanese katakana characters on the way. </p>

              <p>If you don't know a Japanese character, press SPACE to learn it. But don't abuse this feature! Try to learn the character and type them out. That's the only way you can progress through this app!</p>

              <p>Happy learning!</p>

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </AppBar>
    </div>
  );
};
export default NavBar;
