// Edit User Page

import React, { Component } from 'react';

class EditUser extends Component {
    constructor() {
      super();
      this.state = {};
    }
    render() {
        return (<h1>{this.props.activeUser.username} Edit User</h1>)
    }
  }
  
  export default EditUser;
  