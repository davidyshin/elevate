import React, { Component } from 'react';
import axios from 'axios'


class ResumeUpload extends Component {
  constructor() {
    super();
    this.state = {
      file: null,
    }
  }

  handleFiles = (event) => {
    const file = event.target.files[0];
    const data = new FormData();
    data.append('resume', file);
    data.append('id', this.props.job_id);
  
    axios.post('/users/uploadResume', data)
      .then(res => {
        this.props.handleResumeInput(res.data.url)
      })
      .catch(err => {
        console.log(err)
      })
  }


  render() {
    return (
      <div data-aos="fade-up" className="resume-form">
        <form id="2">
          <h1>Resume:</h1>
          <input
            type="file"
            name="resume"
            id="input"
            onChange={this.handleFiles}
          ></input><br />
        </form>
      </div>
    );
  }
}

export default ResumeUpload;
