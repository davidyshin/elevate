// Add Job Form

import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import ResumeUpload from './ResumeUpload.jsx';
import CoverLetterUpload from './CoverLetterUpload.jsx';
import UpdateInterview from './UpdateInterview.jsx';
import AddInterview from './AddInterview.jsx';

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
      experience: 0
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

  addMoreInterview = e => {
    e.preventDefault();
    let { addedInterviews } = this.state;
    addedInterviews.push('Interview');
    this.setState({ addedInterviews: addedInterviews });
  };

  handleResumeInput = e => {
    let { job_id } = this.state;
    const resume_url = e.target.value;
    e.preventDefault();
    axios
      .put('/users/updateResume', {
        resume_url: resume_url,
        job_id: job_id
      })
      .then(() => {
        this.setState({
          resume_url: resume_url
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          message: 'Error updating resume'
        });
      });
    this.updateJobProgress(job_id, 3);
    this.updateExperience(50);
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

  handleCoverInput = e => {
    let { job_id } = this.state;
    const cover_url = e.target.value;
    e.preventDefault();
    axios
      .put('/users/updateCoverLetter', {
        cover_url: cover_url,
        job_id: job_id
      })
      .then(() => {
        this.setState({
          cover_url: cover_url
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          message: 'Error updating cover letter'
        });
      });
    this.updateJobProgress(job_id, 4);
    this.updateExperience(50);
  };

  handleSecondSubmit = e => {
    e.preventDefault();
    let { applicationStage } = this.state;
    if (parseInt(e.target.id) + 1 > applicationStage) {
      applicationStage = parseInt(e.target.id) + 1;
      this.setState({
        applicationStage
      });
    }
  };

  updateExperience = exp => {
    let { experience } = this.state;
    experience += exp;
    this.setState({
      experience
    });
    axios
      .put('/users/updateExperience', {
        experience: experience
      })
      .catch(err => {
        console.log(err);
      });
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

    const SelectedImage = e => {
      return companyLogo ? (
        <img style={{ width: '25px', height: '25px' }} src={companyLogo} />
      ) : (
        ''
      );
    };

    return (
      <div className="update-job-form">
        <div className="update-job-info">
          <h3> Job Info</h3>
          <form onSubmit={this.handleSave}>
            <p>Company:</p>
            <SelectedImage />
            <input type="text" value={company} disable={true} />
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
          <h4>Resume: </h4>{' '}
          {resume_url ? (
         <h4> {resume_url} </h4>
        ) : (
          <div>
            <p> You haven't added a resume, add one now </p>
            <ResumeUpload
              handleResumeInput={this.handleResumeInput}
              handleSecondSubmit={this.handleSecondSubmit}
              resume_url={resume_url}
            />
          </div>
        )}
        </div>
        <div className="cover-input-container">
        <h4>Cover Letter: </h4>{' '}
        {cover_url ? (
          <h4> {cover_url} </h4>
        ) : (
          <div>
            <p> You haven't added a Cover Letter, add one now </p>
            <CoverLetterUpload
              handleCoverInput={this.handleCoverInput}
              handleSecondSubmit={this.handleSecondSubmit}
              cover_url={cover_url}
            />
          </div>
        )}
        </div>
        <div>
          {interviews.map(interview => {
            return (
              <div className="interview-form-container">
                <UpdateInterview interview={interview} />
              </div>
            );
          })}
          <button onClick={this.addMoreInterview}>Add a Interview</button>
        </div>
        {addedInterviews.map(interview => {
          return (
            <div className="add-interview-form-container">
              <AddInterview
                job_id={job_id}
                addMoreInterview={this.addMoreInterview}
                updateExperience={this.updateExperience}
              />
            </div>
          );
        })}
        <h1 onClick={this.props.handleBack}> Back </h1>
      </div>
    );
  }
}

export default UpdateJobForm;
