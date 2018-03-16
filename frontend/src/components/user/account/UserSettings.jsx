// user settings for their notification reminders

import React, { Component } from 'react';

class UserSettings extends Component {
    constructor() {
      super();
      this.state = {};
    }
    render() {
        return (<h1>{this.props.activeUser.username} User Settings </h1>)
    }
  }
  
  export default UserSettings;
  