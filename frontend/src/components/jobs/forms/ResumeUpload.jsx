import React, { Component } from 'react';

class ResumeUpload extends Component {
  constructor() {
    super();
  }
  render() {
    return (
    <div className="resume-form">
      <h3>Resume</h3>
      <form id="2" onSubmit={this.props.handleSecondSubmit}>
        <input onChange={this.props.handleResumeInput} value={this.props.resume} type="file" />
        <input disabled={!this.props.resume_url} type="submit" value="Next" />
      </form>
    </div>
    )
  }
}

export default ResumeUpload