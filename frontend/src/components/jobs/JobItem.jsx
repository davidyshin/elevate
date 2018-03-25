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
    const alternateBg = (this.props.index + 1) % 2 === 1 ? 'job-item-light' : 'job-item-dark';

    return (
      <div className={`job-item ${alternateBg}`}>
        <p className="job-item-index">{this.props.index + 1}</p>

        <p className="job-item-company" onClick={this.props.handleClick} id={job.job_id}>{job.company_name}</p>

        {/* <div className="job-item-company">
          <img src={job.company_logo} alt={job.company_name} />
          <p onClick={this.props.handleClick} id={job.job_id}>{job.company_name}</p>
        </div> */}

        <p className="job-item-position">{job.position_title}</p>
        <p className="job-item-date">{renderDate}</p>

      </div>
    );
  }
}

export default JobItem;
