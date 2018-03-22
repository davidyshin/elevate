// list of all jobs user has applied to
import React, { Component } from 'react';
import axios from 'axios';
import JobItem from './JobItem.jsx';
import JobInfo from './JobInfo.jsx'
import UpdateJobForm from './forms/UpdateJobForm.jsx';

class JobList extends Component {
  constructor() {
    super();
    this.state = {
      jobList: [],
      updating: ''
    };
  }

  componentDidMount() {
    axios
      .get('/users/getAllUserApps')
      .then(data => {
        this.setState({
          jobList: data.data.apps
        });
      })
      .catch(err => {
        console.log(`Error getting all user job applications: `, err);
      });
  }

  handleClick = e => {
    this.setState({
      expanded: e.target.id
    });
    console.log(e.target.id);
    console.log(this.state);
  };

  render() {
    const { jobList, expanded } = this.state;
    return (
      <div className="job-list">
        <h3>List of applied jobs</h3>
        <ol>
          {jobList.map(job => {
            return (
              <li>
                <JobItem editJob={this.props.editJob} handleClick={this.handleClick} job={job} />
                {parseInt(expanded) === parseInt(job.job_id) ? (
                  <JobInfo job={job} />
                ) : (
                  <div />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
}

export default JobList;
