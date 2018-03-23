// Global nav bar for home after user has logged in

import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import '../../stylesheets/home-nav.css';

class HomeNavBar extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="home-nav-bar">
        <div className="home-nav-left">
          <Link to="/">Jobs</Link>
          <Link to="/addjob">Add Job</Link>
        </div>
        <div className="home-nav-right">
          <Link to="/profile"><i className="far fa-user-circle"></i></Link>
          <h3 onClick={this.props.logOut}>Logout</h3>
        </div>
        {/* <i onClick={this.props.logOut} className="fas fa-sign-out-alt"></i> */}
      </div>
    );
  }
}

export default HomeNavBar;


