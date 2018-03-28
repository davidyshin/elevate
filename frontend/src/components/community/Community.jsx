import React, { Component } from 'react';
import axios from 'axios';

class Community extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return (
      <div>
        <h1>Community</h1> 
        <h2>{this.props.activeUser.first_name} {this.props.activeUser.last_name}</h2>
      </div>
    );
  }
}

export default Community;
