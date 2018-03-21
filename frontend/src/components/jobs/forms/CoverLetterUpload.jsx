import React, { Component } from 'react';

class CoverLetterUpload extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="cover-letter-form">
        <h3>Cover Letter</h3>
        <form id="3" onSubmit={this.props.handleSecondSubmit}>
          <input onChange={this.props.handleCoverInput} type="file" />
          <input disabled={!this.props.cover_url} type="submit" value="Next" />
        </form>
      </div>
    );
  }
}

export default CoverLetterUpload;
