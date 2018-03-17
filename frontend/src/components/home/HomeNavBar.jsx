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
      </div>
    );
  }
}

export default HomeNavBar;
