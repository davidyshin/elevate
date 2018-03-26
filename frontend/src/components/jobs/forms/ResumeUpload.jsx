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
  console.log(event.target.files[0])  
  console.log('MY TARGET FILE',file);
  const data = new FormData();
  data.append('file', file.name);
  console.log('MY TARGET FILE',data);
  // data.append('filename', file.name);
  // data.append('job_id', this.props.job_id);
  // let temp = data
  // console.log('BEFORE I SEND THE DATA', file.name)
  // console.log('BEFORE I SEND THE DATA', data )
  // var formData = new FormData();
  // formData.append('username', 'Chris');
  // console.log('BEFORE I SEND THE DATA', formData )
  axios.post('/users/uploadResume',  file)
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
