import React, { Component } from 'react';
import axios from 'axios';
import '../../stylesheets/auth-form.css';

class SignUpForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      password: '',
      retypePassword: '',
      message: null,
      photo_url: ''
    };
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      username,
      firstName,
      lastName,
      phoneNumber,
      password,
      photo_url,
      retypePassword
    } = this.state;

    if (password.length < 6) {
      this.setState({
        message: 'Password too short'
      });
    } else if (password !== retypePassword) {
      this.setState({
        message: 'Passwords do not match'
      });
    } else {
      axios
        .post('/users/newuser', {
          username: username,
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          password: password,
          photo_url: photo_url
        })
        .then(() => {
          axios
            .post('/users/login', {
              username: username,
              password: password
            })
            .then(res => {
              this.props.setActiveUser(res.data);
            })
            .catch(err => {
              console.log(err);
              this.setState({
                message: 'Error logging in'
              });
            });
        })
        .catch(err => {
          console.log(err);
          this.setState({
            username: '',
            password: '',
            message: 'Error registering'
          });
        });
    }
  };

  render() {
    const {
      username,
      firstName,
      lastName,
      phoneNumber,
      password,
      retypePassword,
      message
    } = this.state;
    const errorMessage = message ? <p>{message}</p> : null;

    return (
      <div className="signup-form auth-form-container">
        <form onSubmit={this.handleSubmit}>
          {errorMessage}
          <input
            placeholder="Email"
            type="email"
            value={username}
            name="username"
            onChange={this.handleInput}
            required
          />
          <div className="auth-form-input-horizontal">
            <input
              placeholder="First name"
              type="text"
              name="firstName"
              value={firstName}
              onChange={this.handleInput}
              required
            />
            <input
              placeholder="Last name"
              type="text"
              name="lastName"
              value={lastName}
              onChange={this.handleInput}
              required
            />
          </div>
          <input
            placeholder="Phone number"
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            maxLength="10"
            onChange={this.handleInput}
            required
          />
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleInput}
            required
          />
          <input
            placeholder="Retype password"
            type="password"
            name="retypePassword"
            value={retypePassword}
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
