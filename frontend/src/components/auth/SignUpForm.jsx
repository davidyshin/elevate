
import React, { Component } from 'react';
import axios from 'axios';

class SignUpForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      password: '',
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
    const { username, firstName, lastName, phoneNumber, password, photo_url } = this.state;
    axios
      .post('/users/newuser', {
        user: {
          username: username,
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          password: password,
          photo_url: photo_url
        }
      })
      .then(res => {
        console.log(res);
        this.setState({
          message: 'REGISTRATION SUCCESS!'
        });
      })
      .then(() => {
        axios
          .post('/users/login', {
            username: username,
            password: password
          })
          .then(res => {
            this.props.setActiveUser(res.data)
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err, 'Error line 61, SignUpForm.jsx');
        this.setState({
          username: '',
          password: '',
          message: 'Invalid Login'
        });
      });
  };

  render() {
    return (
      <div className="signup-form auth-form-container">
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Email"
            type="email"
            value={this.state.username}
            name="username"
            onChange={this.handleInput}
            required
          />
          <input
            placeholder="First Name"
            type="text"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleInput}
            required
          />
          <input
            placeholder="Last Name"
            type="text"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleInput}
            required
          />
          <input
            placeholder="Phone Number"
            type="text"
            name="phoneNumber"
            value={this.state.phoneNumber}
            maxLength="10"
            onChange={this.handleInput}
            required
          />
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleInput}
            required
          />
          <input type="submit" value="Sign Up" />
        </form>
        {this.state.message}
      </div>
    );
  }
}

export default SignUpForm;