// Container for Login and SignUp components

import React, { Component } from "react";
import LoginForm from "./LoginForm.jsx";
import SignUpForm from "./SignUpForm.jsx";

class AuthContainer extends Component {
  constructor() {
    super();
    this.state = {
      activeForm: "signup"
    };
  }

  activeComponent = props => {
    if (props.activeForm === "login") {
      return <LoginForm />;
    } else if (props.activeForm === "signup") {
      return <SignUpForm />;
    }
  };

  toggleActive = e => {
    this.setState({
      activeForm: e.target.id
    });
  };

  render() {
    let { activeForm } = this.state;
    return (
      <div className="auth-container">
        <h3 onClick={this.toggleActive} id="login">
          Login
        </h3>
        {"   "}
        <h3 onClick={this.toggleActive} id="signup">
          Sign Up
        </h3>
        <this.activeComponent activeForm={activeForm} />
      </div>
    );
  }
}

export default AuthContainer;
