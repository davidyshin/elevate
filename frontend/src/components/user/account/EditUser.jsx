// Edit User Page

import React, { Component } from 'react';

class EditUser extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      phoneNumber: ''
    };
  }
  componentDidMount() {
    this.setState({
      username: this.props.activeUser.username,
      email: this.props.activeUser.email,
      phoneNumber: this.props.activeUser.phone_number
    });
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="edit-user-modal">
        <h1>{this.props.activeUser.username} Edit User</h1>
        <form>
          <p>Username</p>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleInput}
          />
          <p>Email</p>
          <input
            onChange={this.handleInput}
            type="email"
            name="email"
            value={this.state.email}
          />
          <p>Phone Number</p>
          <input
            onChange={this.handleInput}
            type="text"
            name="phoneNumber"
            value={this.state.phoneNumber}
          />
        </form>
        <h1 onClick={this.props.toggleModal}> Cancel </h1>
      </div>
    );
  }
}

export default EditUser;
