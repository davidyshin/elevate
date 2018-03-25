import React, { Component } from 'react';
import AddJobForm from './forms/AddJobForm.jsx';
import UpdateJobForm from './forms/UpdateJobForm.jsx';
import JobList from './JobList.jsx';
import JobSummary from './JobSummary.jsx';
import '../../stylesheets/jobs-main.css';

class JobsContainer extends Component {
  constructor() {
    super();
    this.state = {
      editingJob: ''
    };
  }

  editJob = job => {
    this.setState({
      editingJob: job
    });
  };

  handleBack = () => {
    this.setState({
      editingJob: ''
    });
  };

  render() {
    const { editingJob } = this.state;
    return (
      <div className="jobs-container">
        {!editingJob ? (
          <div className="active-jobs-container">
            <JobSummary activeUser={this.props.activeUser} />
            <JobList
              editJob={this.editJob}
              activeUser={this.props.activeUser}
            />
          </div>
        ) : (
          <UpdateJobForm activeUser={this.props.activeUser} handleBack={this.handleBack} editingJob={editingJob} />
        )}
      </div>
    );
  }
}

export default JobsContainer;
