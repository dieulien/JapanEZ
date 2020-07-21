import React from "react";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
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
    fetch("http://localhost:3001/register", {
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
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-2">
        <main className="pa4 black-80">
          <form className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Register</legend>
              <div>
                <label className="db fw6 lh-copy f6" for="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="name"
                  name="name"
                  id="name"
                  onChange={this.onNameInput}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" for="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailInput}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" for="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordInput}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onFormSubmit}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
            <div className="lh-copy mt3">
              <p
                className="f6 link dim black db pointer"
                onClick={() => this.props.onRouteChange("signin")}
              >
                Sign in
              </p>
            </div>
          </form>
        </main>
      </article>
    );
  }
}

export default Register;
