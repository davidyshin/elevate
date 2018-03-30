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
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    const renderDate = mm+'/'+dd+'/'+yyyy

    const tabletDate = mm+'/'+dd+'/'+yyyy.toString().slice(2)
    const mobileDate = mm+'/'+dd+'/'+yyyy.toString().slice(2)

    const alternateBg =
      this.props.index % 2 === 0 ? 'job-item-light' : 'job-item-dark';

    return (
      <div
        className={`job-item ${alternateBg}`}
        onClick={this.props.handleClick}
        id={job.job_id}
      >
        <p className="job-item-index" id={job.job_id}>
          {this.props.index + 1}
        </p>

        <p className="job-item-company" id={job.job_id}>
          {job.company_name}
        </p>

        <p className="job-item-position" id={job.job_id}>
          {job.position_title}
        </p>
        <p className="job-item-date" id={job.job_id}>
          {renderDate}
        </p>

        {/* Responsive toggle */}
        <p className="job-item-tablet-date" id={job.job_id}>
          {tabletDate}
        </p>
        <p className="job-item-mobile-date" id={job.job_id}>
          {mobileDate}
        </p>
        {/* End responsive toggle */}
      </div>
    );
  }
}

export default JobItem;
