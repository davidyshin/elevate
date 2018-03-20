// Add Job Form

import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

class AddJobForm extends Component {
  constructor() {
    super();
    this.state = {
      company: '',
      suggestedCompanies: [],
      companyLogo: '',
      position: '',
      date: '',
      url: ''
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    let application = {
      company: this.state.company,
      position: this.state.position,
      date: this.state.date,
      companyLogo: this.state.companyLogo,
      url: this.state.url
    };
    this.setState({
      company: '',
      companyInput: '',
      suggestedCompanies: [],
      companyLogo: '',
      position: '',
      date: '',
      url: ''
    });
    console.log(application);
  };

  getSuggestions = value => {
    if (value.length > 2) {
      axios
        .get(
          `https://autocomplete.clearbit.com/v1/companies/suggest?query=${value}`
        )
        .then(res => this.setState({ suggestedCompanies: res.data }));
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
      date,
      url
    } = this.state;
    const inputProps = {
      placeholder: 'Type a company name',
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
          <form onSubmit={this.handleSubmit}>
            <p>Company</p>
            <SelectedImage />
            <Autosuggest
            theme={{suggestionsList: {listStyle: "none"}}}
              suggestions={suggestedCompanies}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={this.getSuggestionValue}
              onSuggestionSelected={this.onSuggestionSelected}
              renderSuggestion={this.renderSuggestion}
              inputProps={inputProps}
            />
            <p>Position</p>
            <input
              onChange={this.handleInput}
              value={position}
              name="position"
              type="text"
            />
            <p>Date Applied</p>
            <input
              onChange={this.handleDate}
              value={date}
              name="date"
              type="date"
            />
            <p>Job Posting Url</p>
            <input
              onChange={this.handleInput}
              value={url}
              name="url"
              type="text"
            />
            <input type="submit" value="Next" />
          </form>
        </div>
        <div style={{ display: 'none' }} className="add-job-resume">
          <h3>Resume</h3>
          <form>
            <input type="file" />
          </form>
        </div>
        <div style={{ display: 'none' }} className="add-job-coverletter">
          <h3>Cover Letter</h3>
          <form>
            <input type="file" />
          </form>
        </div>
        <div style={{ display: 'none' }} className="add-job-interview">
          <h3>Interview 1</h3>
          <form>
            <p>Date</p>
            <input type="date" />
            <p>Time</p>
            <input type="time" />
            <p>Contact</p>
            <input type="text" />
          </form>
        </div>
        <div style={{ display: 'none' }} className="add-job-interview">
          <h3>Interview 2</h3>
          <form>
            <p>Date</p>
            <input type="date" />
            <p>Time</p>
            <input type="time" />
            <p>Contact</p>
            <input type="text" />
          </form>
        </div>
        <div style={{ display: 'none' }} className="add-job-interview">
          <h3>Interview 3</h3>
          <form>
            <p>Date</p>
            <input type="date" />
            <p>Time</p>
            <input type="time" />
            <p>Contact</p>
            <input type="text" />
          </form>
        </div>
      </div>
    );
  }
}

export default AddJobForm;
