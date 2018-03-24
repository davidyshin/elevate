import React, { Component } from 'react';

class ResumeUpload extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="resume-form">
        <form id="2">
          <h1>Resume</h1>
          <input
            onChange={this.props.handleResumeInput}
            value={this.props.resume}
            type="file"
          />
        </form>
      </div>
    );
  }
}

export default ResumeUpload;
