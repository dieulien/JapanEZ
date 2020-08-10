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

const useStyles = (theme) => ({
  container: {
    fontFamily: "Roboto",
    backfround: "white",
  },
  paper: {
    marginTop: theme.spacing(8),
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
      <Paper className={classes.paper2} elevation={3}>
        <Container component="main" maxWidth="xs" className={classes.container}>
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
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={this.onEmailInput}
              />
              <TextField
                error={this.state.passwordErrorMsg}
                helperText={this.state.passwordErrorMsg}
                variant="outlined"
                margin="normal"
                required
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
              >
                Sign In
              </Button>
              <Grid
                container
                alignItems="center"
                direction="column"
                justify="center"
              >
                <Grid item xs>
                  <Link href="#" variant="body2">
                    {"Forgot password?"}
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => this.props.onRouteChange("register")}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </Paper>
    );
  }
}

export default withStyles(useStyles)(Signin);
