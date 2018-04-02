import React, { Component } from 'react';
import axios from 'axios';
import '/Users/c4q/Documents/capstone/elevate/frontend/src/stylesheets/resumeupload.css'


class CoverLetterUpload extends Component {
  constructor() {
    super();
    this.state = {
      file: null
    };
  }

  handleFiles = event => {
    const file = event.target.files[0];
    const data = new FormData();
    data.append('cover', file);
    data.append('id', this.props.job_id);

    axios
      .post('/users/uploadCover', data)
      .then(res => {
        this.props.handleCoverInput(res.data.url);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div data-aos="fade-up" className="cover-form">
        <form className="resume-form  fileinput-button"
        id="2">
        <span>
          <img className='upload-img' src='data:image/png;base64,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' alt='upload image'/>
          <h2 >Click here to upload Resume</h2>
          </span>          
          <input
            type="file"
            name="cover"
            id="input"
            onChange={this.handleFiles}
          />
          <br />
        </form>
      </div>
    );
  }
}

export default CoverLetterUpload;
