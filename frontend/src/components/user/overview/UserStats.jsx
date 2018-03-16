// Add Job Form

import React, { Component } from 'react';

class UserStats extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
      return (<h1>{this.props.activeUser.username} User Stats </h1>)
  }
}

export default UserStats;
