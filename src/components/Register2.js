import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { REGISTER_URL } from "../constants";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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

class Register2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
    };
  }

  onNameInput = (event) => {
    this.setState({ name: event.target.value });
  };

  onEmailInput = (event) => {
    this.setState({ email: event.target.value });
  };

  onPasswordInput = (event) => {
    this.setState({ password: event.target.value });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    const { name, email, password } = this.state;
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
        if (Object.keys(data).length === 4) {
          this.props.loadUser(data);
          this.props.onRouteChange("home");
        }
      })
      .catch((error) => {
        console.log("Error!", error);
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper2}>
        <Container component="main" maxWidth="xs" className={classes.container}>
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                id="name"
                label="Your Name"
                autoFocus
                required
                fullWidth
                onChange={this.onNameInput}
              />
              <TextField
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.onFormSubmit}
              >
                Register
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => this.props.onRouteChange("signin")}
                  >
                    {"Already registered? Sign In"}
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

export default withStyles(useStyles)(Register2);
