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
        <div className="job-item-company">
          <img src={job.company_logo} alt={job.company_name} />
          <p>{job.company_name}</p>
        </div>
        <p className="job-item-position">{job.position_title}</p>
        <p className="job-item-date">{renderDate}</p>

        <h3 onClick={this.props.handleClick} id={job.job_id}>
          Info
        </h3>
      </div>
    );
  }
}

export default JobItem;
