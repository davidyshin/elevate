import React, { Component } from 'react';
import axios from 'axios';

class EditUser extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      phoneNumber: '',
      newFirstName: '',
      newLastName: '',
      newUsername: '',
      newPhoneNumber: '',
      message: null
    };
  }

  componentDidMount() {
    this.setState({
      firstName: this.props.activeUser.first_name,
      lastName: this.props.activeUser.last_name,
      username: this.props.activeUser.username,
      phoneNumber: this.props.activeUser.phone_number
    });
  }

  // edit user information and settings => axios.put('/updateInfo')

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const editedInfo = {
      firstName: this.state.newFirstName || this.state.firstName,
      lastName: this.state.newLastName || this.state.lastName,
      username: this.state.newUsername || this.state.username,
      phoneNumber: this.state.newPhoneNumber || this.state.phoneNumber
    };

    axios
      .put('/users/updateUserInfo', {
        firstName: editedInfo.firstName,
        lastName: editedInfo.lastName,
        username: editedInfo.username,
        phoneNumber: editedInfo.phoneNumber
      })
      .then(res => {
        console.log(res);
        this.setState({
          message: 'Saved'
        })
      })
      .catch(err => {
        console.log(err);
        this.setState({
          message: 'Error saving'
        })
      });

    console.log(editedInfo.firstName);
  };

  render() {
    const { firstName, lastName, username, phoneNumber, newFirstName, newLastName, newUsername, newPhoneNumber, message } = this.state;
    const statusMessage = message ? <p>{message}</p> : null;

    return (
      <div className="edit-user-modal">
        <h1>Edit</h1>
        <form onSubmit={this.handleSubmit}>
          <p>First name</p>
          <input
            onChange={this.handleInput}
            type="text"
            name="newFirstName"
            value={newFirstName}
            placeholder={firstName}
          />
          <p>Last name</p>
          <input
            onChange={this.handleInput}
            type="text"
            name="newLastName"
            value={newLastName}
            placeholder={lastName}
          />
          <p>Email</p>
          <input
            onChange={this.handleInput}
            type="email"
            name="newUsername"
            value={newUsername}
            placeholder={username}
          />
          <p>Phone Number</p>
          <input
            onChange={this.handleInput}
            type="text"
            name="newPhoneNumber"
            maxlength="10"
            value={newPhoneNumber}
            placeholder={phoneNumber}
          />
          <input type="submit" value="Save" />
          <input type="button" value="Cancel" onClick={this.props.toggleModal} />
        </form>
        {statusMessage}
        {/* <h1 onClick={this.props.toggleModal}>Cancel</h1> */}
      </div>
    );
  }
}

export default EditUser;
