// Container for Login and SignUp components

import React, { Component } from "react";
import LoginForm from "./LoginForm.jsx";
import SignUpForm from "./SignUpForm.jsx";

class AuthContainer extends Component {
  constructor() {
    super();
    this.state = {
      activeComponent: "signup"
    };
  }

  activeComponent = props => {
    if (props.active === "login") {
      return <LoginForm />;
    } else if (props.active === "signup") {
      return <SignUpForm />;
    }
  };

  toggleActive = e => {
      this.setState({
          activeComponent: e.target.id
      })
  }

  render() {
    let { activeComponent } = this.state;
    return (
      <div className="auth-container">
        <h3 onClick={this.toggleActive} id="login">Login</h3>
        {"   "}
        <h3 onClick={this.toggleActive} id="signup">Sign Up</h3>
        <this.activeComponent active={this.state.activeComponent} />
      </div>
    );
  }
}

export default AuthContainer