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
          <h3> Job Info</h3>
          <form>
            <p>Company</p>
            <input type="text" />
            <p>Position</p>
            <input type="text" />
            <p>Date Applied</p>
            <input type="date" />
            <p>Job Posting Url</p>
            <input type="text" />
          </form>
        </div>
        <div className="add-job-resume">
          <h3>Resume</h3>
          <form>
            <input type="file" />
          </form>
        </div>
        <div className="add-job-coverletter">
          <h3>Cover Letter</h3>
          <form>
            <input type="file" />
          </form>
        </div>
        <div className="add-job-interview">
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
      </div>
    );
  }
}

export default AddJobForm;
