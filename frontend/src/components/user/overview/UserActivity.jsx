// Add Job Form

import React, { Component } from 'react';

class UserActivity extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
      return (<h1>{this.props.activeUser.username} User Activity </h1>)
  }
}

export default UserActivity;
