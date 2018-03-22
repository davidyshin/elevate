import React, { Component } from 'react';

class EditUser extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      phoneNumber: ''
    };
  }

  componentDidMount() {
    this.setState({
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
      username: this.state.username,
      phoneNumber: this.state.phoneNumber
    };
    console.log(editedInfo);
  };

  render() {
    const { username, email, phoneNumber } = this.state; 
    console.log(this.state); 

    return (
      <div className="edit-user-modal">
        <h1>{this.props.activeUser.username} Edit User</h1>
        <form onSubmit={this.handleSubmit}>
          <p>Email</p>
          <input
            onChange={this.handleInput}
            type="email"
            name="username"
            value={username}
          />
          <p>Phone Number</p>
          <input
            onChange={this.handleInput}
            type="text"
            name="phoneNumber"
            maxlength="10"
            value={phoneNumber}
          />
          <input type="submit" value="Submit" />
        </form>
        <h1 onClick={this.props.toggleModal}> Cancel </h1>
      </div>
    );
  }
}

export default EditUser;
