// Add Job Form

import React, { Component } from 'react';

class AddJobForm extends Component {
  constructor() {
    super();
    this.state = {};
  }
  submitForm = () => {};
  render() {
    return (
      <div className="add-job-form">
        <div className="add-job-info">
          <p>Company</p>
          <input type="text" />
          <p>Position</p>
          <input type="text" />
          <p>Date Applied</p>
          <input type="date"  />
          <p>Job Posting Url</p>
          <input type="text" />
        </div>
        <div className="add-job-resume">
          <p>Resume</p>
          <input type="file" />
        </div>
        <div className="add-job-coverletter">
          <p>Cover Letter</p>
          <input type="file" />
        </div>
        <div className="add-job-interview">
          <h3>Interview 1</h3>
          <p>Date</p>
          <input type="date" />
          <p>Time</p>
          <input type="time" />
          <p>Contact</p>
          <input type="text" />
        </div>
      </div>
    );
  }
}

export default AddJobForm;
