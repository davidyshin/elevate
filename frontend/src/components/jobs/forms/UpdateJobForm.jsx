// Update Job Form

import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import ResumeUpload from './ResumeUpload.jsx';
import CoverLetterUpload from './CoverLetterUpload.jsx';
import UpdateInterview from './UpdateInterview.jsx';
import AddInterview from './AddInterview.jsx';
import { Link } from 'react-router-dom';
import '../../../stylesheets/jobs-update.css';
import Calendar from 'react-calendar';

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
      addedInterviews: ['test'],
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
      job_posting_url: this.state.url
    }).then(this.setState({applicationStage: 2}))
  };

  componentDidMount() {
    const id = this.props.job_id;

    axios
      .get(`/users/getJob/${id}`)
      .then(data => {
        const editingJob = data.data.job;
        const date = new Date(editingJob.date_applied);
        this.setState({
          job_id: editingJob.job_id,
          editingJob: editingJob,
          company: editingJob.company_name,
          companyLogo: editingJob.company_logo,
          position: editingJob.position_title,
          job_phone_number: editingJob.job_phone_number,
          job_email: editingJob.job_email,
          url: editingJob.job_posting_url,
          resume_url: editingJob.resume_url,
          cover_url: editingJob.cover_url,
          date_applied: date,
          job_status: editingJob.job_status,
          experience: this.props.activeUser.experience,
          salary: editingJob.salary || '',
          salarySaved: false
        });
      })
      .catch(err => {
        console.log(err);
      });
    axios
      .get(`/users/getInterviews/${id}`)
      .then(data => {
        this.setState({ interviews: data.data.interviews });
      })
      .catch(err => console.log(err));
  }

  handleSalarySave = e => {
    e.preventDefault();
    const { salary, job_id } = this.state;
    axios
      .put('/users/updateJobSalary', {
        job_id: job_id,
        salary: salary
      })
      .then(() => {
        this.setState({
          salarySaved: true
        });
      })
      .catch(err => console.log(err));
  };

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDate = date => {
    this.setState({ date_applied: date });
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
    const { job_id } = this.state;
    axios
      .put('/users/updateResume', {
        resume_url: res,
        job_id: job_id
      })
      .then(() => {
        let { applicationStage } = this.state;
        this.setState({
          resume_url: res,
          applicationStage: 3
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
        this.setState({
          cover_url: res,
          applicationStage: 4
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
  changeStage = e => {
    this.setState({ applicationStage: parseInt(e.target.id) });
  };

  setApplicationStage = e => {
    console.log('hello');
    let { applicationStage } = this.state;
    if (e.target.id === 'right') {
      if (applicationStage === 5) {
        applicationStage = 1;
      } else {
        applicationStage += 1;
      }
    } else if (e.target.id === 'left') {
      if (applicationStage === 1) {
        applicationStage = 5;
      } else {
        applicationStage -= 1;
      }
    }
    this.setState({ applicationStage });
  };

  renderInterviews = () => {
    const { interviews, addedInterviews, job_id } = this.state;
    return (
      <div className="update-interview-company" data-aos="fade-up">
        {interviews.map(interview => {
          return (
            <UpdateInterview
              interview={interview}
              addMoreInterview={this.addMoreInterview}
            />
          );
        })}
        {addedInterviews.map(interview => {
          return (
            <AddInterview
              job_id={job_id}
              addMoreInterview={this.addMoreInterview}
              updateExperience={this.props.updateExperience}
            />
          );
        })}
      </div>
    );
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
      addedInterviews,
      job_status,
      salary,
      salarySaved
    } = this.state;

    return (
      <div className="update-job-form-container">
        <div className="stage-container">
          <span className="stage-arrow-left">
            <i
              id="left"
              onClick={this.setApplicationStage}
              class="fas fa-arrow-left fa-2x"
            />
          </span>
          <span
            id="1"
            onClick={this.changeStage}
            className={applicationStage === 1 ? 'stage-active' : 'stage'}
          />
          <span
            id="2"
            onClick={this.changeStage}
            className={applicationStage === 2 ? 'stage-active' : 'stage'}
          />
          <span
            id="3"
            onClick={this.changeStage}
            className={applicationStage === 3 ? 'stage-active' : 'stage'}
          />
          <span
            id="4"
            onClick={this.changeStage}
            className={applicationStage === 4 ? 'stage-active' : 'stage'}
          />
          <span
            id="5"
            onClick={this.changeStage}
            className={applicationStage === 5 ? 'stage-active' : 'stage'}
          />
          <span className="stage-arrow-right">
            <i
              id="right"
              onClick={this.setApplicationStage}
              class="fas fa-arrow-right fa-2x"
            />
          </span>
        </div>
        <div
          hidden={applicationStage > 1 ? true : false}
          className="update-job-info"
          data-aos="fade-up"
        >
          <form onSubmit={this.handleSave}>
            <h1> Job Info</h1>
            <p>Company: *</p>
            <div className="company-input">
              <div>
                <input
                  className="update-job-applied-company"
                  type="text"
                  value={company}
                  disabled={true}
                  readOnly
                />
              </div>
              {companyLogo ? (
                <img className="company-image" src={companyLogo} />
              ) : (
                <span className="building-icon">
                  <i className="fas fa-building fa-2x" />
                </span>
              )}
            </div>
            <p>Position applied to: *</p>
            <input
              onChange={this.handleInput}
              value={position}
              placeholder="Position"
              name="position"
              type="text"
            />
            <p>Date Applied: *</p>
            <Calendar onChange={this.handleDate} value={date_applied} />
            {/* <input
              onChange={this.handleDate}
              value={date_applied}
              name="date_applied"
              type="date"
            /> */}
            <p>Job Posting Url:</p>
            <input
              onChange={this.handleInput}
              value={url}
              placeholder="URL"
              name="url"
              type="text"
            />
            <input
              disabled={saved || !company || !position || !date_applied}
              type="submit"
              value="Next"
            />
          </form>
        </div>

        {applicationStage === 2 ? (
          resume_url ? (
            <div data-aos="fade-up" className="resume-url-container">
              <h1> Resume: </h1>
              <a
                href={`https://s3.amazonaws.com/elevateresumes/${resume_url}`}
                target="_blank"
              >
                Your uploaded resume.
              </a>
            </div>
          ) : (
            <ResumeUpload
              handleResumeInput={this.handleResumeInput}
              job_id={job_id}
            />
          )
        ) : null}

        {applicationStage === 3 ? (
          cover_url ? (
            <div data-aos="fade-up" className="cover-url-container">
              <h1>Cover Letter: </h1>
              <a
                href={`https://s3.amazonaws.com/elevatecovers/${cover_url}`}
                target="_blank"
              >
                Your uploaded Cover Letter.
              </a>
            </div>
          ) : (
            <CoverLetterUpload
              handleCoverInput={this.handleCoverInput}
              job_id={job_id}
            />
          )
        ) : null}
        {applicationStage === 4 ? <this.renderInterviews /> : null}
        {applicationStage === 5 ? (
          <div data-aos="fade-up" className="update-job-status">
            <h1> Update Job Application Status </h1>
            <div className="job-status-switch-field">
              <input
                onChange={this.handleStatusChange}
                type="radio"
                id="offered"
                name="offered"
                className="status-switch-offered"
                checked={this.state.job_status === 'offered'}
              />
              <label for="offered">Offered</label>
              <input
                onChange={this.handleStatusChange}
                type="radio"
                id="awaiting"
                name="awaiting"
                className="status-switch-awaiting"
                checked={this.state.job_status === 'awaiting'}
              />
              <label for="awaiting">Awaiting</label>
              <input
                onChange={this.handleStatusChange}
                type="radio"
                id="rejected"
                name="rejected"
                className="status-switch-rejected"
                checked={this.state.job_status === 'rejected'}
              />
              <label for="rejected">Rejected</label>
            </div>
            {job_status === 'offered' ? (
              <div className="salary-input-container">
                {salarySaved ? (
                  <h3>Saved Salary</h3>
                ) : (
                  <h3> Offered Salary </h3>
                )}
                <input
                  className="salary-input"
                  name="salary"
                  onChange={this.handleInput}
                  type="text"
                  maxLength="20"
                  placeholder="Salary"
                />
                <button
                  className="salary-input-save"
                  disabled={salary.length < 1 || salarySaved}
                  onClick={this.handleSalarySave}
                  type="submit"
                  value="Save"
                >
                  Apply
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}

export default UpdateJobForm;
