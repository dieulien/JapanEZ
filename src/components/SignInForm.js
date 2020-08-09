import React from "react";
import "./Signin.css";
import { SIGNIN_URL } from "../constants";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
    };
  }

  onEmailInput = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordInput = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onSignIn = (event) => {
    event.preventDefault();
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
        } else {
          console.log("Login Failed", data);
        }
      })
      .catch((error) => {
        console.log("Error!", error);
      });
  };



  render() {
    const theme = createMuiTheme();
    return (
    
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <article className="br3 pa4 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-2">
      <div >
      <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
        <Box mt={4} mb={2}>
        <Avatar color="secondary">
        <LockOutlinedIcon />
        </Avatar>
      </Box>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <form Validate>
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me" disabled
          />

          <Box mb = {1}>
          <Button 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.onSignIn}
          >
            Sign In
          </Button>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="outlined"
            color="primary"
            onClick={() => this.props.onRouteChange("register")}
          >
            Register
          </Button>
        </form>
        </Grid>

        
      </div>
      </article>
    </Container>
    );
  }
}

export default SignInForm;
