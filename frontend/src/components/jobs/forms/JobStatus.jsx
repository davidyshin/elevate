import React, { Component } from 'react';

class JobStatus extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div data-aos="fade-up" className="job-status-form">
        <h1> Update Job Application Status </h1>
        <div className="job-status-switch-field">
          <input
            onChange={this.props.handleStatusChange}
            type="radio"
            id="offered"
            name="offered"
            className="status-switch-offered"
            checked={this.props.job_status === 'offered'}
          />
          <label for="offered">Offered</label>
          <input
            onChange={this.props.handleStatusChange}
            type="radio"
            id="awaiting"
            name="awaiting"
            className="status-switch-awaiting"
            checked={this.props.job_status === 'awaiting'}
          />
          <label for="awaiting">Awaiting</label>
          <input
            onChange={this.props.handleStatusChange}
            type="radio"
            id="rejected"
            name="rejected"
            className="status-switch-rejected"
            checked={this.props.job_status === 'rejected'}
          />
          <label for="rejected">Rejected</label>
        </div>
        {this.props.job_status === 'offered' ? (
          <div className="salary-input-container">
            {this.props.salarySaved ? <h3> Offered Salary </h3> : <h3>Salary</h3>}
            <input
              className="salary-input"
              name="salary"
              onChange={this.props.handleInput}
              type="text"
              maxLength="20"
              placeholder="Salary"
            />
            <button
              className="salary-input-save"
              disabled={this.props.salary.length < 1 || this.props.salarySaved}
              onClick={this.props.handleSalarySave}
              type="submit"
              value="Save"
            >
              Save
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}



export default JobStatus