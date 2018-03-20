import React, { Component } from 'react';

class SplashContainer extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="splash-container">
        <h1>Welcome to Elevate</h1> 
      </div>
    );
  }
}

export default SplashContainer;