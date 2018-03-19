import React, { Component } from 'react';
import axios from 'axios';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
  }
  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    axios
      .post('/users/login', {
        username: username,
        password: password
      })
      .then(res => {
        console.log("handling submit" , res);
        this.props.setActiveUser(res.data);
      })
      .catch(err => {
        console.log(err);
        this.setState({
          username: '',
          password: '',
          message: 'Username / Password Incorrect'
        });
      });
  };

  render() {
    return (
      <div className="login-form">
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Email"
            type="email"
            name="username"
            onChange={this.handleInput}
            required
          />
          <input
            placeholder="Password"
            type="password"
            name="password"
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