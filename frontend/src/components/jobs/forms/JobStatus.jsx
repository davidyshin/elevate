import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../../stylesheets/jobs-update.css';


class JobStatus extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div data-aos="fade-up" className="job-status-form">
        <div className="job-status-form-title">
          <h1> Update your status </h1>
          <h3> Click on the current status of this application </h3>
        </div>
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
          <div className="job-status-message">
            <h3>Congratulations!</h3>
            <div className="job-status-button-container">
              <button
                onClick={this.props.handleSkipButton}
                className="job-status-accepted-button"
                type="button"
              >
                Next
              </button>
            </div>
          </div>
        ) : null}

        {this.props.job_status === 'awaiting' ? (
          <div className="job-status-message">
            <h3>Patience is a virtue</h3>
            <Link to="/">
              <h3>Click here to return home</h3>
            </Link>
            {!this.props.updateForm ? <h3 className="back-to-home-link" onClick={this.props.handleNewJob}>
              Or log another job
            </h3> : null}
          </div>
        ) : null}

        {this.props.job_status === 'rejected' ? (
          <div className="job-status-message">
            <h3>Hey, you made it this far</h3>
            <Link to="/">
              <h3>Click here to return home</h3>
            </Link>
            {!this.props.updateForm ? <h3 className="back-to-home-link" onClick={this.props.handleNewJob}>
              Or log another job
            </h3> : null}
          </div>
        ) : null}
      </div>
    );
  }
}

export default JobStatus;
