// Add Job Form

import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import ResumeUpload from './ResumeUpload.jsx';
import CoverLetterUpload from './CoverLetterUpload.jsx';
import JobStatus from './JobStatus.jsx';
import JobSideBar from './JobSideBar.jsx';
import AddInterview from './AddInterview.jsx';
import { Link } from 'react-router-dom';
import achieves from '../../achievements/checkForAchievements';
import '../../../stylesheets/jobs-add.css';
import Calendar from 'react-calendar';

import dotenv from 'dotenv';
dotenv.load();

const AutoSuggestStyling = {
  suggestionsList: { listStyle: 'none' }
};

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
if (dd < 10) {
  dd = '0' + dd;
}
if (mm < 10) {
  mm = '0' + mm;
}

today = yyyy + '-' + mm + '-' + dd;

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
      salary: '',
      salarySaved: false,
      saved: false,
      interviews: [],
      interviewSaved: ''
    };
  }

  componentDidMount() {
    this.setState({
      experience: this.props.activeUser.experience
    });
  }

  handleFirstSubmit = e => {
    e.preventDefault();
    let date = new Date(); // Today
    let timeZone = new Date(date.getTime() - date.getTimezoneOffset() * 60000); // Today minus time zone
    let dateLogged = timeZone.toISOString().substring(0, 10);
    const companyLogo = this.state.companyLogo
      ? this.state.companyLogo
      : 'https://i.imgur.com/gBiRInp.png';
    axios
      .post('/users/createJobApp', {
        company_name: this.state.company,
        company_logo: companyLogo,
        date_applied: this.state.date_applied,
        date_logged: dateLogged,
        job_email: this.state.email,
        job_phone_number: this.state.phoneNumber,
        position_title: this.state.position,
        progress_in_search: 2,
        job_status: 'awaiting',
        job_posting_url: this.state.url
      })
      .then(data => {
        achieves.checkJobNumber();
        this.props.updateExperience(100);
        this.setState({
          job_id: data.data.returned.job_id,
          saved: true,
          applicationStage: 2,
          interviewSaved: true,
          job_status: 'awaiting'
        });
      })
      .catch(err => {
        console.log(err);
      });

    const { job_id } = this.state;
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

  addMoreInterview = e => {
    e.preventDefault();
    let { interviews } = this.state;
    interviews.push('interview');
    this.setState({ interviews, interviewSaved: false });
  };

  saveInterview = () => {
    this.setState({ interviewSaved: true });
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

  handleResumeInput = res => {
    let { job_id } = this.state;
    axios
      .put('/users/updateResume', {
        resume_url: res,
        job_id: job_id
      })
      .then(() => {
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
          interviews: ['firstInterview'],
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

  handleDate = date => {
    this.setState({ date_applied: date });
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

  renderJobSideBar = () => {
    const {company, companyLogo, date_applied, position} = this.state
    return <JobSideBar companyLogo={companyLogo} company={company} date_applied={date_applied} position={position}  />
  }

  renderStage = () => {
    const { applicationStage, interviews, job_id } = this.state;
    switch (applicationStage) {
      case 2:
        return (
          <ResumeUpload
            handleResumeInput={this.handleResumeInput}
            job_id={job_id}
          />
        );
        break;
      case 3:
        return (
          <CoverLetterUpload
            Upload
            handleResumeInput={this.handleResumeInput}
            job_id={job_id}
          />
        );
      case 4:
        return (
          <AddInterview
            job_id={job_id}
            updateExperience={this.props.updateExperience}
            saveInterview={this.saveInterview}
            addMoreInterview={this.addMoreInterview}
          />
        );
        break;
      case 5:
        return (
          <JobStatus
            salarySaved={this.state.salarySaved}
            salary={this.state.salary}
            handleStatusChange={this.handleStatusChange}
            handleInput={this.handleInput}
            job_status={this.state.job_status}
            handleSalarySave={this.handleSalarySave}
          />
        );
    }
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
      interviewSaved,
      applicationStage,
      interviews,
      job_status,
      salary,
      salarySaved
    } = this.state;
    const inputProps = {
      placeholder: `Company Name`,
      value: company,
      onChange: this.handleCompanyInput
    };
    return (
      <div className="add-job-form-container">
        {saved ? (
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
        ) : null}
        <div
          data-aos="fade-up"
          hidden={applicationStage > 1 ? true : false}
          className="add-job-info"
        >
          <form onSubmit={this.handleFirstSubmit}>
            <h1> Job Info</h1>
            <p>Company applied to: *</p>
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
                <img className="company-image" src={companyLogo} />
              ) : (
                <span className="magnifying-glass">
                  <i className="fas fa-search fa-2x" />
                </span>
              )}
            </div>
            <div className="add-job-form-input-title">
              {' '}
              <p>Position applied to: *</p>
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
                <i className="fas fa-briefcase fa-2x" />
              </span>
            </div>
<<<<<<< HEAD
              <p>Date applied: *</p>{' '}
            <div className="input-date-container">
              <input
                onChange={this.handleDate}
                value={date_applied}
                placeholder="Date"
                max={today}
                name="date_applied"
                type="date"
              />
=======
            <p>Date applied: *</p>{' '}
            <div className="date-applied-input">
              <Calendar onChange={this.handleDate} value={date_applied} />
>>>>>>> b26131b25ffe0e0a3d5e5e94e85de42e8c84a9da
            </div>
            <p>Job posting url: </p>
            <input
              onChange={this.handleInput}
              value={url}
              placeholder="URL"
              name="url"
              type="text"
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
        {applicationStage > 1 ? (
          <div>
            <this.renderJobSideBar/> <this.renderStage />
          </div>
        ) : null}
      </div>
    );
  }
}

export default AddJobForm;
