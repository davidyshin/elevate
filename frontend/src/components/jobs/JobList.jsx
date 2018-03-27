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
      expandId: '',
      renderJobList: []
    };
  }

  componentDidMount() {
    axios
      .get('/users/getAllUserApps')
      .then(data => {
        const jobs = data.data.apps.sort((a,b) => a.date_applied < b.date_applied)
        this.setState({
          jobList: jobs,
          renderJobList: jobs
        });
      })
      .catch(err => {
        console.log(`Error getting all user job applications: `, err);
      });
  }

  handleClick = e => {
    return this.state.expandId === e.target.id ?
      this.setState({
        expandId: ''
      })
      :
      this.setState({
        expandId: e.target.id
      });
  };
  handleFilter = e => {
    let {jobList} = this.state
    if (e.target.id !== 'applied') {
    let filteredJobList = jobList.filter(job => {
      return job.job_status === e.target.id
    })
    this.setState({
      renderJobList: filteredJobList
    })
  } else {
    this.setState({
      renderJobList: jobList
    })
  }


  }

  render() {
    const { expandId, renderJobList } = this.state;

    const expandClass = 'job-info-container-expand';

    return (
      <div className="job-list">
        <nav className="job-list-nav">
          <h3 id="applied" onClick={this.handleFilter}>APPLIED</h3>
          <h3 id="awaiting" onClick={this.handleFilter}>AWAITING</h3>
          <h3 id="rejected" onClick={this.handleFilter}>REJECTED</h3>
          <h3 id="offered" onClick={this.handleFilter}>OFFERED</h3>
        </nav>
        <div className="job-item-top-row">
          <p className="job-number">#</p>
          <p className="job-company">Company</p>
          <p className="job-position">Position</p>
          <p className="job-date">Application Date</p>
        </div>
        {renderJobList.map((job, index) => (
          <div>
            <JobItem job={job} index={index} handleClick={this.handleClick} />
            {parseInt(expandId) === parseInt(job.job_id) ?
              <JobInfo job={job} index={index} editJob={this.props.editJob} expandClass={expandClass} />
              :
              <JobInfo job={job} editJob={this.props.editJob} />
            }
          </div>
        ))}
      </div>
    );
  }
}

export default JobList;
