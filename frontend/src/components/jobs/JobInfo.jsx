import React, { Component } from 'react';

class JobInfo extends Component {
  constructor() {
    super();
  }

  handleEditClick = () => {
    this.props.editJob(this.props.job);
  }

  convertToPhone = phone => {
    let first = phone.slice(0, 3); 
    let second = phone.slice(3, 6);
    let third = phone.slice(6, 10);
    let converted = `(${first}) ${second} ${third}`;

    return converted;
  }

  render() {
    const date_logged = new Date(this.props.job.date_logged).toDateString();

    const date_applied = new Date(this.props.job.date_applied).toDateString();

    const { progress_in_search, job_status, job_posting_url, cover_url, resume_url, job_phone_number, job_email, job_id, company_logo, company_name } = this.props.job;

    const expand = this.props.expandClass ? this.props.expandClass : null;

    const statusMessage = job_status === 'awaiting' ? 'Awaiting response' : job_status === 'offered' ? `Offered $___` : 'Rejected';

    console.log(this.props.job);

    return (
      <div className={`job-info-container ${expand}`}>

        <div className="job-info-top">
          <div className="job-info-logo-container">
            <img src={company_logo} alt={company_name} />
          </div>

          <div className="job-info-company-container">
            <p>Phone number: {job_phone_number ? this.convertToPhone(job_phone_number) : 'not available'}</p>
            <p>Contact email: {job_email ? job_email : 'not available'}</p>
            <p>
              {job_posting_url ? <a href={job_posting_url} target="_blank">Go to job posting</a> : null}
            </p>
          </div>

          <div className="job-info-user-container">
            <p>Logged on: {date_logged}</p>
            <p>
              {resume_url ? <a href={resume_url} target="_blank">Resume</a> : "No resume on file. Add one now."}
            </p>
            <p>
              {cover_url ? <a href={cover_url} target="_blank">Cover Letter</a> : "No cover letter on file. Add one now."}
            </p>
          </div>
        </div>

        <div className="job-info-mid">
          <p>Status: {statusMessage}</p>
          <button id={job_id} onClick={this.handleEditClick}>Update</button>
        </div>

        <div className="job-info-bottom">
          <p>Progress: {progress_in_search} / 5</p>
        </div>

      </div>
    );
  }
}

export default JobInfo;
