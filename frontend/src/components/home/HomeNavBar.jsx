// Global nav bar for Home AFTER user has logged in

import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';

class HomeNavBar extends Component {
  constructor() {
    super();
    this.state = {};
  }
  
  render() {
    return (
      <div className="home-nav-bar">
        <h1>Home Nav Bar</h1>
        <Link to="/">Jobs</Link>
        <Link to="/addjob">Add Job</Link>
        {/* profile link will be on top right side of the page, replaced by an icon(?) most likely*/}
        <Link to="/profile">Profile</Link>
        
        <h1 onClick={this.props.logOut}>Logout</h1>
      </div>
    );
  }
}

export default HomeNavBar;


