// Update Job Form

import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import ResumeUpload from './ResumeUpload.jsx';
import CoverLetterUpload from './CoverLetterUpload.jsx';
import UpdateInterview from './UpdateInterview.jsx';
import AddInterview from './AddInterview.jsx';
import '../../../stylesheets/jobs-update.css';

class UpdateJobForm extends Component {
  constructor() {
    super();
    this.state = {
      editingJob: '',
      company: '',
      companyLogo: '',
      position: '',
      job_phone_number: '',
      job_email: '',
      date_applied: '',
      url: '',
      applicationStage: 1,
      job_id: '',
      resume_url: '',
      cover_url: '',
      interviews: [],
      addedInterviews: [],
      job_status: 'awaiting'
    };
  }

  // 'UPDATE jobs SET date_applied = ${date_applied}, job_email = ${job_email}, job_phone_number = ${job_phone_number}, position_title = ${position_title}, job_posting_url = ${job_posting_url}, progress_in_search = ${progress_in_search} WHERE job_id = ${job_id} AND user_id = ${user_id}',

  handleSave = e => {
    e.preventDefault();
    axios.put('/users/updateJobInfo', {
      job_id: this.state.job_id,
      date_applied: this.state.date_applied,
      job_email: this.state.job_email,
      job_phone_number: this.state.job_phone_number,
      position_title: this.state.position,
      job_posting_url: this.state.url,
      progress_in_search: this.state.applicationStage
    });
  };

  componentDidMount() {
    const { editingJob } = this.props;
    const date = new Date(editingJob.date_applied);
    const date_applied = date.toISOString().substring(0, 10);
    this.setState({
      job_id: editingJob.job_id,
      applicationStage: editingJob.progress_in_search,
      editingJob: editingJob,
      company: editingJob.company_name,
      companyLogo: editingJob.company_logo,
      position: editingJob.position_title,
      job_phone_number: editingJob.job_phone_number,
      job_email: editingJob.job_email,
      url: editingJob.job_posting_url,
      resume_url: editingJob.resume_url,
      cover_url: editingJob.cover_url,
      date_applied: date_applied,
      job_status: editingJob.job_status,
      experience: this.props.activeUser.experience
    });
    axios
      .get(`/users/getInterviews/${editingJob.job_id}`, {})
      .then(data => {
        this.setState({ interviews: data.data.interviews });
      })
      .catch(err => console.log(err));
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDate = e => {
    this.setState({ date_applied: e.target.value });
  };

  handleStatusChange = e => {
    const job_status = e.target.name;

    const { job_id } = this.state;
    console.log('job_status:', job_status, 'job id:', job_id);
    axios
      .put('/users/updateJobStatus', {
        job_id: job_id,
        job_status: job_status
      })
      .then(() => {
        this.setState({ job_status });
      })
      .catch(err => console.log(err));
  };

  addMoreInterview = e => {
    e.preventDefault();
    let { addedInterviews } = this.state;
    addedInterviews.push('Interview');
    this.setState({ addedInterviews: addedInterviews });
  };

  handleResumeInput = res => {
    const {job_id} = this.state
    axios
      .put('/users/updateResume', {
        resume_url: res,
        job_id: job_id
      })
      .then(() => {
        let { applicationStage } = this.state;
        applicationStage = 3 ? 4 : 3;
        this.setState({
          resume_url: res,
          applicationStage
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          message: 'Error updating resume'
        });
      });
    this.updateJobProgress(job_id, 3);
    this.props.updateExperience(50);
  };

  updateJobProgress = (job_id, progress_in_search) => {
    axios
      .put('/users/updateJobProgress', {
        job_id: job_id,
        progress_in_search: progress_in_search
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleCoverInput = res => {
    let { job_id } = this.state;
    axios
      .put('/users/updateCover', {
        cover_url: res,
        job_id: job_id
      })
      .then(() => {
        let { applicationStage } = this.state;
        applicationStage = 3 ? 4 : 3;
        this.setState({
          cover_url: res
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          message: 'Error updating cover letter'
        });
      });
    this.updateJobProgress(job_id, 4);
    this.props.updateExperience(50);
  };

  render() {
    const {
      company,
      companyLogo,
      position,
      job_email,
      date_applied,
      job_phone_number,
      url,
      resume_url,
      cover_url,
      job_id,
      saved,
      applicationStage,
      interviews,
      addedInterviews
    } = this.state;

    return (
      <div className="update-job-form-container">
        <div className="update-job-info">
          <form onSubmit={this.handleSave}>
            <h1> Job Info</h1>
            <p>Company:</p>
            <div className="company-input">
              <div>
                <input
                  className="update-job-applied-company"
                  type="text"
                  value={company}
                  disable={true}
                  readOnly
                />
              </div>
              {companyLogo ? (
                <img className="company-image" src={companyLogo} />
              ) : (
                <span className="building-icon">
                  <i class="fas fa-building fa-2x" />
                </span>
              )}
            </div>
            <p>Position applied to:</p>
            <input
              onChange={this.handleInput}
              value={position}
              placeholder="Position"
              name="position"
              type="text"
            />
            <p>Date Applied:</p>
            <input
              onChange={this.handleDate}
              value={date_applied}
              name="date_applied"
              type="date"
            />
            <p>Job Posting Url:</p>
            <input
              onChange={this.handleInput}
              value={url}
              placeholder="URL"
              name="url"
              type="text"
            />
            <p>Job Contact Phone Number:</p>
            <input
              onChange={this.handleInput}
              value={job_phone_number}
              placeholder="ex: 3478030075"
              name="job_phone_number"
              maxLength="10"
              type="text"
            />
            <p>Job Contact Email:</p>
            <input
              onChange={this.handleInput}
              value={job_email}
              placeholder="Email Address"
              name="job_email"
              type="email"
            />
            <input
              disabled={saved || !company || !position || !date_applied}
              type="submit"
              value="Save"
            />
          </form>
        </div>
        <div className="resume-input-container">
          {resume_url ? (
            <div className="resume-url-container">
              <h1> Resume: </h1>
              <a
                href={`https://s3.amazonaws.com/elevateresumes/${resume_url}`}
                target="_blank"
              >
                Your uploaded resume.
              </a>
            </div>
          ) : (
            <div>
              <h1> Resume: </h1>
              <p> You haven't added a resume, add one now </p>
              <ResumeUpload
                handleResumeInput={this.handleResumeInput}
                job_id={job_id}
              />
            </div>
          )}
        </div>
        <div className="cover-input-container">
          {cover_url ? (
            <div className="cover-url-container">
              <h1>Cover Letter: </h1>
              <a
                href={`https://s3.amazonaws.com/elevatecovers/${cover_url}`}
                target="_blank"
              >
                Your uploaded Cover Letter.
              </a>
            </div>
          ) : (
            <div>
              <h1>Cover Letter: </h1>
              <p> You haven't added a Cover Letter, add one now </p>
              <CoverLetterUpload
                handleCoverInput={this.handleCoverInput}
                job_id={job_id}
              />
            </div>
          )}
        </div>
        <button className='add-interview-button' onClick={this.addMoreInterview}>Add Interview</button>        
        <div>
          {interviews.map(interview => {
            return (
              <div className="interview-form-container">
                <UpdateInterview
                  interview={interview}
                  addMoreInterview={this.addMoreInterview}
                />
              </div>
            );
          })}
        </div>
        {addedInterviews.map(interview => {
          return (
            <div className="add-interview-form-container">
              <AddInterview
                job_id={job_id}
                addMoreInterview={this.addMoreInterview}
                updateExperience={this.props.updateExperience}
              />
            </div>
          );
        })}
        <div className="update-job-status-container">
          <div className="update-job-status">
            <h1> Update Job Application Status </h1>
            <div class="job-status-switch-field">
              <input
                onChange={this.handleStatusChange}
                type="radio"
                id="offered"
                name="offered"
                class="status-switch-offered"
                checked={this.state.job_status === 'offered'}
              />
              <label for="offered">Offered</label>
              <input
                onChange={this.handleStatusChange}
                type="radio"
                id="awaiting"
                name="awaiting"
                class="status-switch-awaiting"
                checked={this.state.job_status === 'awaiting'}
              />
              <label for="awaiting">Awaiting</label>
              <input
                onChange={this.handleStatusChange}
                type="radio"
                id="rejected"
                name="rejected"
                class="status-switch-rejected"
                checked={this.state.job_status === 'rejected'}
              />
              <label for="rejected">Rejected</label>
            </div>
          </div>
        </div>
        <h1 onClick={this.props.handleBack}> Back </h1>
      </div>
    );
  }
}

export default UpdateJobForm;
