import React, { Component } from 'react';
import '../../../stylesheets/interview-prompt.css';
class InterviewPrompt extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div data-aos="fade-up" className="interview-prompt-container">
        <h1> Do you have an interview to add? </h1>
        <h3> If not, you can always come back later to add one. </h3>
        <div className="interview-prompt-buttons">
          <button onClick={this.props.handleInterviewPrompt} id="no" className="interview-prompt-no">No</button>{' '}
          <button onClick={this.props.handleInterviewPrompt} id="yes" className="interview-prompt-yes">Yes</button>
        </div>
      </div>
    );
  }
}


export default InterviewPrompt