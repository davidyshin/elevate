// Global nav bar for home after user has logged in

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../stylesheets/home-nav.css';

class HomeNavBar extends Component {
  constructor() {
    super();
    this.state = {
      activeUser: ''
    };
  }

  componentDidMount() {
    this.setState({
      activeUser: this.props.activeUser
    });
  }

  

  render() {
    console.log(this.state); 

    return (
      <div className="home-nav-bar">
        <div className="home-nav-left">
          <Link to="/">
            <img
              src="https://i.imgur.com/JdYm85w.png"
              alt="elevate"
            />
          </Link>
          <h3><Link to="/">JOBS</Link></h3>
          <h3><Link to="/addjob">ADD JOB</Link></h3>
        </div>
        <div className="home-nav-right">
          <div className="home-nav-exp-container">
            <img src="https://i.imgur.com/oudBkRW.png" alt="exp" />
            <p>{this.state.activeUser.experience}</p>
          </div>
          <Link to="/profile"><i className="far fa-user-circle fa-2x"></i></Link>
        </div>
      </div>
    );
  }
}

export default HomeNavBar;


