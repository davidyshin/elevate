import React, { Component } from 'react';
import axios from 'axios';
import '../../stylesheets/auth-form.css';


class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      message: null
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
        this.props.setActiveUser(res.data);
      })
      .catch(err => {
        console.log(err);
        this.setState({
          username: '',
          password: '',
          message: 'Incorrect username or password'
        });
      });
  };

  render() {
    const { username, password, message } = this.state; 
    const errorMessage = message ? <p>{message}</p> : null; 

    return (
      <div className="login-form auth-form-container">
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
          <input
            placeholder="Password"
            type="password"
            value={password}
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