import React, { Component } from 'react';

class CoverLetterUpload extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="cover-letter-form">
        <form id="3">
          <h1>Cover Letter</h1>
          <input onChange={this.props.handleCoverInput} type="file" />
        </form>
      </div>
    );
  }
}

export default CoverLetterUpload;
