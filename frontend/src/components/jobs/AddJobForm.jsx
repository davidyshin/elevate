// Add Job Form

import React, { Component } from 'react';

class AddJobForm extends Component {
  constructor() {
    super();
    this.state = {
      company: '',
      position: '',
      date: '',
      url: ''
    };
  }
  handleSubmit = e => {
    e.preventDefault()
    console.log(this.state)
  };

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };

  handleDate = e => {
   this.setState({date: e.target.value})
  };

  render() {
    const { company, position, date, url } = this.state;
    return (
      <div className="add-job-form">
        <div className="add-job-info">
          <h3> Job Info</h3>
          <form onSubmit={this.handleSubmit}>
            <p>Company</p>
            <input
              onChange={this.handleInput}
              value={company}
              name="company"
              type="text"
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
