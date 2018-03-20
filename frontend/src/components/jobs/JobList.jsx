// list of all jobs user has applied to 


import React, { Component } from 'react';

class JobList extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
  
  render() {
      return (<h1>{this.props.activeUser.username} Jobs List </h1>)
  }
}

export default JobList;
