// Job item in list inside job container

import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';

class Job extends Component {
  constructor() {
    super();
    this.state = {};
  }
  
  render() {
    return (
      <div className="job-item">
        <h1>Job</h1>
      </div>
    );
  }
}

export default Job;
