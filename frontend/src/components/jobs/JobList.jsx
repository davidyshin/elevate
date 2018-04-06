// List of the logged job applications

import React, { Component } from 'react';
import axios from 'axios';
import JobItem from './JobItem.jsx';
import JobInfo from './JobInfo.jsx';
import UpdateJobForm from './forms/UpdateJobForm.jsx';

class JobList extends Component {
  constructor() {
    super();
    this.state = {
      jobList: [],
      expandId: '',
      renderJobList: [],
      searching: '',
      activeFilter: 'applied'
    };
  }

  componentDidMount() {
    axios
      .get('/users/getAllUserApps')
      .then(data => {
        const jobs = data.data.apps.sort(
          (a, b) => new Date(b.date_applied).getTime() - new Date(a.date_applied)
        )
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
    return this.state.expandId === e.target.id
      ? this.setState({
        expandId: ''
      })
      : this.setState({
        expandId: e.target.id
      });
  };

  handleInputChange = e => {
    this.setState({
      searching: e.target.value,
      activeFilter: 'applied',
      renderJobList: this.state.jobList
    });
  };

  handleFilter = e => {
    let { jobList } = this.state;
    if (e.target.id !== 'applied') {
      let filteredJobList = jobList.filter(job => {
        return job.job_status === e.target.id;
      });
      this.setState({
        renderJobList: filteredJobList,
        activeFilter: e.target.id
      });
    } else {
      this.setState({
        renderJobList: jobList,
        activeFilter: e.target.id
      });
    }
  };

  render() {
    const { expandId, renderJobList, searching, activeFilter } = this.state;

    const expandClass = 'job-info-container-expand-web job-info-container-expand-mobile';

    const searchRender = renderJobList.filter(
      job =>
        job.company_name.toLowerCase().includes(searching.toLowerCase()) ||
        job.position_title.toLowerCase().includes(searching.toLowerCase())
    );

    const mobileVersion = (
      <nav className="job-list-nav-mobile">
          <div className="job-list-searchbar-mobile-container">
            <div className="job-list-search-icon">
              <i class="fas fa-search"></i>
            </div>
            <input
              type="text"
              onChange={this.handleInputChange}
              value={searching}
              placeholder="Search in job applications..."
            />
          </div>
          <div className="job-list-nav-mobile-filter-container">
            <h3 id="applied" onClick={this.handleFilter} className={activeFilter === 'applied' ? 'active-job-option' : null}>
              APPLIED
          </h3>
            <h3 id="awaiting" onClick={this.handleFilter} className={activeFilter === 'awaiting' ? 'active-job-option' : null}>
              AWAITING
          </h3>
            <h3 id="rejected" onClick={this.handleFilter} className={activeFilter === 'rejected' ? 'active-job-option' : null}>
              REJECTED
          </h3>
            <h3 id="offered" onClick={this.handleFilter} className={activeFilter === 'offered' ? 'active-job-option' : null}>
              OFFERED
          </h3>
          </div>
        </nav>
    );

    return (
      <div className="job-list" data-aos="fade-up">
        <nav className="job-list-nav">
          <h3 id="applied" onClick={this.handleFilter} className={activeFilter === 'applied' ? 'active-job-option' : null}>
            APPLIED
          </h3>
          <h3 id="awaiting" onClick={this.handleFilter} className={activeFilter === 'awaiting' ? 'active-job-option' : null}>
            AWAITING
          </h3>
          <h3 id="rejected" onClick={this.handleFilter} className={activeFilter === 'rejected' ? 'active-job-option' : null}>
            REJECTED
          </h3>
          <h3 id="offered" onClick={this.handleFilter} className={activeFilter === 'offered' ? 'active-job-option' : null}>
            OFFERED
          </h3>
          <div className="job-list-searchbar-container">
            <div className="job-list-search-icon">
              <i class="fas fa-search"></i>
            </div>
            <input
              type="text"
              onChange={this.handleInputChange}
              value={searching}
            />
          </div>
        </nav>

        {mobileVersion}

        <div className="job-item-top-row">
          <p className="job-number">#</p>
          <p className="job-company">Company</p>
          <p className="job-position">Position</p>
          <p className="job-date">Application Date</p>
          <p className="job-date-mobile">Date</p>
        </div>
        {searchRender.map((job, index) => (
          <div>
            <JobItem job={job} index={index} handleClick={this.handleClick} />
            {parseInt(expandId) === parseInt(job.job_id) ? (
              <JobInfo
                job={job}
                index={index}
                editJob={this.props.editJob}
                expandClass={expandClass}
              />
            ) : (
                <JobInfo job={job} editJob={this.props.editJob} />
              )}
          </div>
        ))}
      </div>
    );
  }
}

export default JobList;
