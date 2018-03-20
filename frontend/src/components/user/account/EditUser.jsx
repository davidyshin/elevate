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
      phoneNumber: this.props.activeUser.phone_number
    });
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const editedInfo = {
      username: this.state.username,
      phoneNumber: this.state.phoneNumber
    };
    console.log(editedInfo);
  };

  render() {
    return (
      <div className="edit-user-modal">
        <h1>{this.props.activeUser.username} Edit User</h1>
        <form onSubmit={this.handleSubmit}>
          <p>Email</p>
          <input
            onChange={this.handleInput}
            type="email"
            name="username"
            value={this.state.username}
          />
          <p>Phone Number</p>
          <input
            onChange={this.handleInput}
            type="text"
            name="phoneNumber"
            maxlength="10"
            value={this.state.phoneNumber}
          />
          <input type="submit" value="Submit" />
        </form>
        <h1 onClick={this.props.toggleModal}> Cancel </h1>
      </div>
    );
  }
}

export default EditUser;
