import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { SIGNIN_URL } from "../constants";
import "../scss/components/Signin.scss";
import TextBlock from "./TextBlock";

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
    marginTop: theme.spacing(6),
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

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
      emailErrorMsg: "",
      passwordErrorMsg: "",
    };
  }

  onEmailInput = (event) => {
    this.setState({ signInEmail: event.target.value, emailErrorMsg: "" });
  };

  onPasswordInput = (event) => {
    this.setState({ signInPassword: event.target.value, passwordErrorMsg: "" });
  };

  sendSigninInfoToBackend = () => {
    const { signInEmail, signInPassword } = this.state;

    fetch(SIGNIN_URL, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (Object.keys(data).length === 4) {
          this.props.loadUser(data);
          this.props.onRouteChange("home");
          this.setState({
            emailErrorMsg: "",
            passwordErrorMsg: "",
          });
        } else {
          // there is an error loggin in
          console.log("Login Failed", data);
          if (data === "email is not yet registered") {
            this.setState({ emailErrorMsg: data });
          } else if (data === "incorrect password") {
            this.setState({
              passwordErrorMsg: data,
              emailErrorMsg: "",
            });
          }
        }
      })
      .catch((error) => {
        console.log("Error!", error);
      });
  };

  onSignIn = (event) => {
    event.preventDefault();
    const { signInEmail, signInPassword } = this.state;

    // check that fields are not empty
    if (!signInEmail) {
      this.setState({ emailErrorMsg: "please fill out your email" });
    } else {
      this.setState({ emailErrorMsg: "" });
    }
    if (!signInPassword) {
      this.setState({ passwordErrorMsg: "please fill out your password" });
    } else {
      this.setState({ passwordErrorMsg: "" });
    }

    if (signInEmail && signInPassword) {
      this.sendSigninInfoToBackend();
    } else {
      return;
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="flex-container">
        <div className="signin-box">
          <div className="header">
            <h1 className="title">JapanEZ</h1>
            <p className="subtitle">
              Learn Japanese Katakana as you explore English-like Japanese words
            </p>
          </div>
          <div className="signin">
            <Paper className={classes.paper2} elevation={3}>
              <Container
                component="main"
                maxWidth="xs"
                className={classes.container}
              >
                <CssBaseline />
                <div className={classes.paper}>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                  <form className={classes.form} noValidate>
                    <TextField
                      error={this.state.emailErrorMsg}
                      helperText={this.state.emailErrorMsg}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      // autoFocus
                      onChange={this.onEmailInput}
                    />
                    <TextField
                      error={this.state.passwordErrorMsg}
                      helperText={this.state.passwordErrorMsg}
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
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={this.onSignIn}
                      style={{ color: "white" }}
                    >
                      Sign In
                    </Button>
                    <Grid
                      container
                      alignItems="center"
                      direction="column"
                      justify="center"
                    >
                      {/* <Grid item xs>
                        <Link href="#" variant="body2">
                          {"Forgot password?"}
                        </Link>
                      </Grid> */}
                      <Grid item>
                        {"Don't have an account? "}
                        <Link
                          component="button"
                          variant="body2"
                          onClick={() => this.props.onRouteChange("register")}
                        >
                          {"Sign Up"}
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

export default withStyles(useStyles)(Signin);
