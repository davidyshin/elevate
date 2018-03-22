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
      <div style={{background:'white'}}className="JobsContainer">
        <JobSummary activeUser={this.props.activeUser} />
        <JobList activeUser={this.props.activeUser} />
      </div>
    );
  }
}

export default JobsContainer;
