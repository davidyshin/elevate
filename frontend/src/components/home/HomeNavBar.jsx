// Global nav bar for Home AFTER user has logged in

import React, { Component } from 'react';

class HomeNavBar extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="home-nav-bar">
        <h1>Home Nav Bar</h1>
      </div>
    );
  }
}

export default HomeNavBar;
