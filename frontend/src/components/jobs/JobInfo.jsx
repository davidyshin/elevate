import React, { Component } from 'react';

class JobInfo extends Component {
  constructor() {
    super();
  }

  render() {
    const date_logged = new Date(this.props.job.date_logged).toDateString();

    const date_applied = new Date(this.props.job.date_applied).toDateString();

    const {
      progress_in_search,
      job_posting_url,
      cover_url,
      resume_url,
      job_phone_number,
      job_email
    } = this.props.job;
    return (
      <div>
        <h3>Date Logged: {date_logged} </h3>
        <h3>Date Applied: {date_applied} </h3>{' '}
        {job_phone_number ? <h3>Contact Number: {job_phone_number} </h3> : <div/>}
        {job_email ? <h3>Contact Email: {job_email} </h3> : <div/>}        
        <h3>Progress In Search: {progress_in_search}/5</h3>
        <h3><a href={job_posting_url}>Job Posting URL</a></h3>
        <h3><a href={resume_url}>Resume</a></h3>
        <h3><a href={cover_url}>Cover Letter</a></h3>
      </div>
    );
  }
}

export default JobInfo;
