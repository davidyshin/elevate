// Add Job Form

import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import ResumeUpload from './ResumeUpload.jsx';
import CoverLetterUpload from './CoverLetterUpload.jsx';
import AddInterview from './AddInterview.jsx';

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
      date: '',
      url: '',
      applicationStage: 1,
      job_id: '',
      resume_url: '',
      cover_url: ''
    };
  }

  handleFirstSubmit = e => {
    e.preventDefault();
    axios
      .post('/users/createJobApp', {
        company_name: this.state.company,
        company_logo: this.state.companyLogo,
        date_applied: this.state.date,
        job_email: this.state.email,
        job_phone_number: this.state.phoneNumber,
        position_title: this.state.position,
        job_posting_url: this.state.url
      })
      .then(data => {
        this.setState({
          job_id: data.data.returned.job_id,
          applicationStage: 2
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  addMoreInterview = e => {
    e.preventDefault();
    let { applicationStage } = this.state;
    applicationStage += 1;
    this.setState({
      applicationStage
    });
  };

  handleResumeInput = e => {
    const { job_id } = this.state;
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
  };

  handleCoverInput = e => {
    const { job_id } = this.state;
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
  };

  handleSecondSubmit = e => {
    let { applicationStage } = this.state;
    applicationStage = parseInt(e.target.id) + 1;
    e.preventDefault();
    this.setState({
      applicationStage
    });
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
    this.setState({ date: e.target.value });
  };

  render() {
    const {
      company,
      companyLogo,
      suggestedCompanies,
      selectedCompany,
      position,
      email,
      date,
      phoneNumber,
      url,
      resume_url,
      cover_url,
      job_id,
      applicationStage
    } = this.state;
    const inputProps = {
      placeholder: 'Company',
      value: company,
      onChange: this.handleCompanyInput
    };
    const SelectedImage = e => {
      return companyLogo ? (
        <img style={{ width: '25px', height: '25px' }} src={companyLogo} />
      ) : (
        ''
      );
    };
    return (
      <div className="add-job-form">
        <div className="add-job-info">
          <h3> Job Info</h3>
          <form id="1" onSubmit={this.handleFirstSubmit}>
            <p>Company:</p>
            <SelectedImage />
            <Autosuggest
              theme={{ suggestionsList: { listStyle: 'none' } }}
              suggestions={suggestedCompanies}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={this.getSuggestionValue}
              onSuggestionSelected={this.onSuggestionSelected}
              renderSuggestion={this.renderSuggestion}
              inputProps={inputProps}
            />
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
              value={date}
              name="date"
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
            <p> Phone Number:</p>
            <input
              onChange={this.handleInput}
              value={phoneNumber}
              placeholder="ex: 3478030075"
              name="phoneNumber"
              maxLength="10"
              type="text"
            />
            <p> Email:</p>
            <input
              onChange={this.handleInput}
              value={email}
              placeholder="Email Address"
              name="email"
              type="email"
            />
            <input
              disabled={!company || !position || !date}
              type="submit"
              value="Next"
            />
          </form>
        </div>
        <div
          hidden={applicationStage > 1 ? false : true}
          className="add-job-resume-container"
        >
          <ResumeUpload
            handleResumeInput={this.handleResumeInput}
            handleSecondSubmit={this.handleSecondSubmit}
            resume_url={resume_url}
          />
        </div>
        <div
          hidden={applicationStage > 2 ? false : true}
          className="add-job-coverletter-container"
        >
          <CoverLetterUpload
            handleCoverInput={this.handleCoverInput}
            handleSecondSubmit={this.handleSecondSubmit}
            cover_url={cover_url}
          />
        </div>
        <div
          hidden={applicationStage > 3 ? false : true}
          className="add-job-interview-container"
        >
          <AddInterview
            job_id={job_id}
            addMoreInterview={this.addMoreInterview}
          />
        </div>
        <div
          hidden={applicationStage > 4 ? false : true}
          className="add-job-interview-container"
        >
          <AddInterview
            job_id={job_id}
            addMoreInterview={this.addMoreInterview}
          />
        </div>
        <div
          hidden={applicationStage > 5 ? false : true}
          className="add-job-interview-container"
        >
          <AddInterview
            job_id={job_id}
            addMoreInterview={this.addMoreInterview}
          />
        </div>
      </div>
    );
  }
}

export default AddJobForm;
