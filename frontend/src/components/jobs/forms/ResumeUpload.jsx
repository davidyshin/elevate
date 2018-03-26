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
  let file = event.target.files[0];
  // console.log('CHECK IF FILE EXISTS: ', file)
  console.log(file.name);
  let data = new FormData();
  data.append('file', file);
  data.append('filename', file.name);
  data.append('job_id', this.props.job_id);
  axios.post('/users/uploadResume', {
    data: data
  })
      .then(res => {
          console.log('FRONT RES',res)
          this.props.handleResumeInput(res)
      })
      
      .catch(err => {
          console.log(err)
      })
}


  render() {
    return (
      <div className="resume-form">
        <form id="2">
          <h1>Resume</h1>
          <input 
          type="file" 
          name="jobid" 
          id="input" 
          onChange={this.handleFiles}
          ></input><br/>
        </form>
      </div>
    );
  }
}

export default ResumeUpload;
