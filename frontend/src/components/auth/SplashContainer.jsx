import React, { Component } from 'react';
import '../../stylesheets/auth.css';


class SplashContainer extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="splash-container">
        <div className="splash-top">
          <h1>Elevate</h1>
          <p>Elevate is the most rewarding job application tracker.</p>
          <button>Demo</button>
          <button>Create an account</button>
        </div>
        <div className="splash-features">
          <div>
            <img />
            <p>Never forget an interview date or to follow up.</p>
          </div>
          <div>
            <img />
            <p>Earn experience points towards your success.</p>
          </div>
          <div>
            <img />
            <p>Some great feature</p>
          </div>
        </div>
        <div className="splash-footer">
          <p>Elevate</p>
          <img />
          <p>Made by The Reactors</p>
        </div>
      </div>
    );
  }
}

export default SplashContainer;