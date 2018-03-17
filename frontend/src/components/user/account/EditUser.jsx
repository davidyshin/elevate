// Edit User Page

import React, { Component } from 'react';

class EditUser extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="edit-user-modal">
        <h1>{this.props.activeUser.username} Edit User</h1>
        <h1 onClick={this.props.toggleModal}> Cancel </h1>
      </div>
    );
  }
}

export default EditUser;
