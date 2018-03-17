// Sign up page

import React, { Component } from 'react';

class SignUpForm extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="signup-form">
        <form onSubmit={this.submitForm}>
          <input
            placeholder="Email"
            type="text"
            name="emailInput"
            onChange={this.handleInput}
            required
          />
          <input
            placeholder="First Name"
            type="text"
            name="firstNameInput"
            onChange={this.handleInput}
            required
          />
          <input
            placeholder="Last Name"
            type="text"
            name="lastNameInput"
            onChange={this.handleInput}
            required
          />
          <input
            placeholder="Phone Number"
            type="text"
            name="numberInput"
            maxLength="9"
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
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    );
  }
}

export default SignUpForm;
