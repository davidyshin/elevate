// container to hold jobsummary and joblist

import React, { Component } from 'react';
import AddJobForm from './forms/AddJobForm.jsx';
import UpdateJobForm from './forms/UpdateJobForm.jsx';
import JobList from './JobList.jsx';
import JobSummary from './JobSummary.jsx';

class JobsContainer extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="JobsContainer">
        <h1>{this.props.activeUser.username} Jobs Container </h1>
        <JobSummary activeUser={this.props.activeUser} />
        <JobList activeUser={this.props.activeUser} />
      </div>
    );
  }
}

export default JobsContainer;
