import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../stylesheets/animations.css';


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

    const { progress_in_search, job_status, job_posting_url, cover_url, resume_url, job_phone_number, job_email, job_id, company_logo, company_name, salary } = this.props.job;

    const expand = this.props.expandClass ? this.props.expandClass : null;

    const initiateProgressEarned = this.props.expandClass ? "job-info-search-progress-earned" : null;

    const statusMessage = job_status === 'Awaiting' ? 'awaiting response' : job_status === 'offered' ? `Offered: ${salary || ''}` : 'Rejected';

    const progressPercentage = (parseInt(progress_in_search) / 5) * 100;

    const progressStyle = {
      width: `${progressPercentage}%`
    }

    const alternateBg = (this.props.index) % 2 === 0 ? 'job-info-light' : 'job-info-dark';


    return (
      <div className={`job-info-container ${expand} ${alternateBg}`}>
        <div className="job-info-view-web">

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
                {resume_url ? <a href={`https://s3.amazonaws.com/elevateresumes/${resume_url}`} target="_blank">Resume</a> : "No resume on file. Add one now."}
              </p>
              <p>
                {cover_url ? <a href={`https://s3.amazonaws.com/elevatecovers/${cover_url}`} target="_blank">Cover Letter</a> : "No cover letter on file. Add one now."}
              </p>
            </div>

            <div className="job-info-button-container">
              <Link to={`/updateJob/${job_id}`}>Update Job</Link>
            </div>
          </div>

          <div className="job-info-mid">
            <p>Status: {statusMessage}</p>
          </div>

          <div className="job-info-bottom">
            <div className="job-info-search-progress-total">
              <div className={initiateProgressEarned} style={progressStyle} />
            </div>
          </div>
        </div>{/* End web browser view */}

        <div className="job-info-view-mobile">
          <div className="job-info-top">
            <img src={company_logo} alt={company_name} />
          </div>

          <div className="job-info-company-container">
            <p><i className="fas fa-phone"></i> {job_phone_number ? this.convertToPhone(job_phone_number) : 'Not available'}</p>
            <p><i className="fas fa-envelope"></i> {job_email ? job_email : 'Not available'}</p>
          </div>

          <div className="job-info-user-container">
            <p>{job_posting_url ? <a href={job_posting_url} target="_blank">Go to job posting <i className="fas fa-external-link-alt"></i></a> : null}</p>
            <p>{resume_url ? <a href={`https://s3.amazonaws.com/elevateresumes/${resume_url}`} target="_blank">Resume <i className="fas fa-download"></i></a> : "No resume on file"}</p>
            <p>{cover_url ? <a href={`https://s3.amazonaws.com/elevatecovers/${cover_url}`} target="_blank">Cover Letter <i className="fas fa-download"></i></a> : "No cover letter on file"}</p>
            <p>Logged on: {date_logged}</p>
          </div>

          <div className="job-info-button-container">
            <Link to={`/updateJob/${job_id}`}>
              <button>Update Job</button>
            </Link>
          </div>

          <div className="job-info-status-container">
            <p>Status: {statusMessage}</p>
          </div>

          <div className="job-info-bottom">
            <div className="job-info-search-progress-total">
              <div className={initiateProgressEarned} style={progressStyle} />
            </div>
          </div>

        </div>{/* End mobile view */}

      </div>
    );
  }
}

export default JobInfo;
