// Login page

import React, { Component } from 'react';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="login-form">
        <form onSubmit={this.submitForm}>
          <input
            placeholder="Email"
            type="text"
            name="emailInput"
            onChange={this.handleInput}
            required
          />
          <input
            placeholder="Password"
            type="password"
            name="passwordInput"
            onChange={this.handleInput}
            required
          />
          <input type="submit" value="Log in" />
        </form>
      </div>
    );
  }
}

export default LoginForm;
