// ANALYTICs

import React, { Component } from 'react';

class JobSummary extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="job-summary">
        {' '}
        <h1>{this.props.activeUser.first_name}'s' Job Summary </h1>{' '}
      </div>
    );
  }
}

export default JobSummary;
