import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { REGISTER_URL } from "../constants";
import "../scss/components/Signin.scss";
import TextBlock from "./TextBlock";
import LoadingPopup from "./LoadingPopup";

import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import FontDownloadIcon from "@material-ui/icons/FontDownload";
import FeedbackIcon from "@material-ui/icons/Feedback";
import SubtitlesIcon from "@material-ui/icons/Subtitles";

const useStyles = (theme) => ({
  container: {
    fontFamily: "Roboto",
    backfround: "white",
  },
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper2: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 500,
      height: 450,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      nameError: false,
      emailError: false,
      passwordError: false,
      nameErrorMsg: "",
      emailErrorMsg: "",
      passwordErrorMsg: "",
      openLoadingPopup: false,
    };
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  onNameInput = (event) => {
    this.setState({ name: event.target.value, nameErrorMsg: "" });
  };

  onEmailInput = (event) => {
    this.setState({ email: event.target.value, emailErrorMsg: "" });
  };

  onPasswordInput = (event) => {
    this.setState({ password: event.target.value, passwordErrorMsg: "" });
  };

  sendFormDataToBackEnd = () => {
    const { name, email, password } = this.state;
    this.setState({ openLoadingPopup: true })

    fetch(REGISTER_URL, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ openLoadingPopup: false })

        if (Object.keys(data).length === 4) {
          this.setState({ emailErrorMsg: "" });
          this.props.loadUser(data);
          this.props.onRouteChange("home");
        } else {
          // if user already exist
          this.setState({ emailErrorMsg: data });
        }
      })
      .catch((error) => {
        console.log("Error!", error);
      });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    const { name, email, password } = this.state;

    if (!name) {
      this.setState({ nameErrorMsg: "please fill out your name" });
    } else {
      this.setState({ nameErrorMsg: "" });
    }
    if (!email) {
      this.setState({ emailErrorMsg: "please fill out your email" });
    } else {
      this.setState({ emailErrorMsg: "" });
    }
    if (!password) {
      this.setState({ passwordErrorMsg: "please fill out your password" });
    } else {
      this.setState({ passwordErrorMsg: "" });
    }

    if (!this.validateEmail(email)) {
      this.setState({ emailErrorMsg: "please enter a valid email address" });
      return;
    } else {
      this.setState({ emailErrorMsg: "" });
    }

    if (name && password && email) {
      this.sendFormDataToBackEnd();
    } else {
      return;
    }
  };

  render() {
    const { classes } = this.props;
    const { nameErrorMsg, emailErrorMsg, passwordErrorMsg } = this.state;
    return (
      <div className="flex-container">
        <LoadingPopup isOpen={this.state.openLoadingPopup} />
        <div className="signin-box">
          <div className="header">
            <h1 className="title">JapanEZ</h1>
            <p className="subtitle">
              Learn Japanese Katakana as you explore English-like Japanese words
            </p>
          </div>
          <div className="signin">
            <Paper className={classes.paper2}>
              <Container
                component="main"
                maxWidth="xs"
                className={classes.container}
              >
                <CssBaseline />
                <div className={classes.paper}>
                  <Typography component="h1" variant="h5">
                    Register
                  </Typography>
                  <form className={classes.form} noValidate>
                    <TextField
                      error={nameErrorMsg}
                      helperText={nameErrorMsg}
                      variant="outlined"
                      id="name"
                      label="Your Name"
                      // autoFocus
                      fullWidth
                      onChange={this.onNameInput}
                    />
                    <TextField
                      error={emailErrorMsg}
                      helperText={emailErrorMsg}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={this.onEmailInput}
                    />
                    <TextField
                      error={passwordErrorMsg}
                      helperText={passwordErrorMsg}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={this.onPasswordInput}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={this.onFormSubmit}
                      style={{ color: "#ffffff" }}
                    >
                      Get started
                    </Button>
                    <Grid
                      container
                      alignItems="center"
                      direction="column"
                      justify="center"
                    >
                      <Grid item>
                        {"Already registered? "}
                        <Link
                          component="button"
                          variant="body2"
                          onClick={() => this.props.onRouteChange("signin")}
                        >
                          {"Sign In"}
                        </Link>
                      </Grid>
                    </Grid>
                  </form>
                </div>
              </Container>
            </Paper>
          </div>
        </div>
        <div className="info-panel">
          <div className="info-panel-inner">
            <TextBlock
              icon={<AssignmentIndIcon fontSize="large" />}
              title="Tailored to your learning progress"
              description="Either you've just started out or you've been learning for a
                while, the tool helps you master Katakana in an effective way."
            />
            <TextBlock
              icon={<FeedbackIcon fontSize="large" />}
              title="Built-in mnemonics and smart feedback"
              description="Receive contextual feedback when you input the wrong character."
            />
            <TextBlock
              icon={<FontDownloadIcon fontSize="large" />}
              title="Words that sound like English"
              description="Such as kisu (kiss), in'teru (intelligent). You'd be surprised how much Japanese you've already known."
            />
            <TextBlock
              icon={<SubtitlesIcon fontSize="large" />}
              title="Learn real common Japanese words"
              description="You can listen to audio from native speakers. This helps you compare and contrast the pronunciation of
                Japanese and English."
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(Register);
