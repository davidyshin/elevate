// Add Job Form

import React, { Component } from 'react';

class UserProgress extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
      return (<h1>{this.props.activeUser.username} User Progress</h1>)
  }
}

export default UserProgress;
