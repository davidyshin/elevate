// Add Job Form

import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import ResumeUpload from './ResumeUpload.jsx';
import CoverLetterUpload from './CoverLetterUpload.jsx';
import AddInterview from './AddInterview.jsx';
import theme from '../../../stylesheets/jobs-add.css';

const AutoSuggestStyling = {
  suggestionsList: { listStyle: 'none' }
  // suggestion: { display: 'flex', width: '400px', flexDirection: 'row', justifyContent: 'space-between'}
};

class AddJobForm extends Component {
  constructor() {
    super();
    this.state = {
      company: '',
      suggestedCompanies: [],
      companyLogo: '',
      position: '',
      phoneNumber: '',
      email: '',
      date_applied: '',
      url: '',
      applicationStage: 1,
      job_id: '',
      resume_url: '',
      cover_url: '',
      experience: 0,
      saved: false,
      interviews: []
    };
  }

  componentDidMount() {
    this.setState({
      experience: this.props.activeUser.experience
    });
  }

  handleFirstSubmit = e => {
    e.preventDefault();
    const date = new Date();
    const dateStr = date.toISOString().substring(0, 10);
    axios
      .post('/users/createJobApp', {
        company_name: this.state.company,
        company_logo: this.state.companyLogo,
        date_applied: this.state.date_applied,
        date_logged: dateStr,
        job_email: this.state.email,
        job_phone_number: this.state.phoneNumber,
        position_title: this.state.position,
        progress_in_search: 2,
        job_posting_url: this.state.url
      })
      .then(data => {
        this.setState({
          job_id: data.data.returned.job_id,
          saved: true,
          applicationStage: 2
        });
      })
      .catch(err => {
        console.log(err);
      });

    const { job_id } = this.state;
    this.updateExperience(100);
  };

  addMoreInterview = e => {
    e.preventDefault();
    let { interviews } = this.state;
    interviews.push('interview');
    this.setState({ interviews });
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
          resume_url: resume_url,
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
    this.updateExperience(50);
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
          cover_url: cover_url,
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
    this.updateExperience(50);
    this.addMoreInterview(e);
  };

  getSuggestions = value => {
    if (value.length > 2) {
      axios
        .get(
          `https://autocomplete.clearbit.com/v1/companies/suggest?query=${value}`
        )
        .then(res => this.setState({ suggestedCompanies: res.data }))
        .catch(err => {
          console.log('Error fetching suggestions for dropdown, message:', err);
        });
    }
  };

  renderSuggestion = suggestion => (
    <div name={suggestion.name} className="suggestion-container">
      <img
        style={{ width: '25px', height: '25px' }}
        className="suggestion-logo"
        src={suggestion.logo}
      />
      <p className="suggestion-name">{suggestion.name}</p>
    </div>
  );

  getSuggestionValue = suggestion => suggestion.name;

  handleCompanyInput = e => {
    this.setState({ company: e.target.value });
    if (this.state.company.length < 2) {
      this.setState({
        selectedCompany: '',
        companyLogo: ''
      });
    }
  };
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      companySuggestions: this.getSuggestions(value)
    });
  };
  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      companySuggestions: []
    });
  };

  onSuggestionSelected = (event, { suggestion, suggestionValue }) => {
    this.setState({
      company: suggestionValue,
      companyLogo: suggestion.logo
    });
    this.onSuggestionsClearRequested();
  };
  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDate = e => {
    this.setState({ date_applied: e.target.value });
  };

  render() {
    const {
      company,
      companyLogo,
      suggestedCompanies,
      selectedCompany,
      position,
      email,
      date_applied,
      phoneNumber,
      url,
      resume_url,
      cover_url,
      job_id,
      saved,
      applicationStage,
      interviews
    } = this.state;
    const inputProps = {
      placeholder: `Company Name`,
      value: company,
      onChange: this.handleCompanyInput
    };
    return (
      <div className="add-job-form-container">
        <div className="add-job-info">
          <form onSubmit={this.handleFirstSubmit}>
            <h1> Job Info</h1>
            <div className="add-job-form-input-title">
              <p>Company applied to:</p>
            </div>
            <div className="company-search-input">
              <Autosuggest
                className="add-job-form-input-company"
                theme={AutoSuggestStyling}
                suggestions={suggestedCompanies}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                onSuggestionSelected={this.onSuggestionSelected}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
              />
              {companyLogo ? (
                <img
                  className="company-image"
                  src={companyLogo}
                />
              ) : (
                <span className="magnifying-glass">
                  <i className="fas fa-search fa-2x" />
                </span>
              )}
            </div>
            <div className="add-job-form-input-title">
              {' '}
              <p>Position applied to:</p>
            </div>
            <div className="position-search-input">
              <div>
                <input
                  onChange={this.handleInput}
                  value={position}
                  placeholder="Position"
                  name="position"
                  type="text"
                />
              </div>
              <span className="brief-case">
                <i class="fas fa-briefcase fa-2x" />
              </span>
            </div>
            <div className="add-job-form-input-title">
              {' '}
              <p>Date applied:</p>{' '}
            </div>
            <div className="date-applied-input">
            <input
              onChange={this.handleDate}
              value={date_applied}
              placeholder="Date"
              name="date_applied"
              type="date"
            />
            
            </div>
            <div className="add-job-form-input-title">
              {' '}
              <p>Job posting url: </p>
            </div>
            <input
              onChange={this.handleInput}
              value={url}
              placeholder="URL"
              name="url"
              type="text"
            />
            <div className="add-job-form-input-title">
              <p>Job contact phone number: </p>
            </div>
            <input
              onChange={this.handleInput}
              value={phoneNumber}
              placeholder="ex: 3470000000"
              name="phoneNumber"
              maxLength="10"
              type="text"
            />
            <div className="add-job-form-input-title">
              <p>Job contact email:</p>
            </div>
            <input
              onChange={this.handleInput}
              value={email}
              placeholder="Job Contact Email Address"
              name="email"
              type="email"
            />
            <div className="add-job-buttons">
              <input
                disabled={saved || !company || !position || !date_applied}
                type="submit"
                value="Save"
              />
            </div>
          </form>
        </div>
        <div
          className="add-job-resume-container"
          hidden={applicationStage >= 2 ? false : true}
          className="add-job-resume-container"
        >
          <ResumeUpload
            handleResumeInput={this.handleResumeInput}
            resume_url={resume_url}
          />
        </div>
        <div
          hidden={applicationStage >= 3 ? false : true}
          className="add-job-coverletter-container"
        >
          <CoverLetterUpload
            handleCoverInput={this.handleCoverInput}
            cover_url={cover_url}
          />
        </div>
        {interviews.map(interview => {
          return (
            <div className="add-job-interview-container">
              <AddInterview
                job_id={job_id}
                updateExperience={this.updateExperience}
                addMoreInterview={this.addMoreInterview}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default AddJobForm;
