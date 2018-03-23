// Job item in list inside job container

import React, { Component } from 'react';

class JobItem extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const job = this.props.job;
    const date = new Date(this.props.job.date_applied);
    const renderDate = date.toDateString();
    return (
      <div className="job-item">
        {/* <h3>Company</h3> */}
        <img style={{ width: '25px', height: '25px' }} src={job.company_logo} />
        <p>{job.company_name}</p>
        {/* <h3>Position</h3> */}
        <p>{job.position_title}</p>
        {/* <h3>Date Applied</h3> */}
        <p>{renderDate}</p>

        <h1 onClick={this.props.handleClick} id={job.job_id}>
          Info
        </h1>
      </div>
    );
  }
}

export default JobItem;
