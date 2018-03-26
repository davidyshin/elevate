import React, { Component } from 'react';
import axios from 'axios'


class CoverLetterUpload extends Component {
  constructor() {
    super();
    this.state = {
      file: null,
    }
  }

  handleFiles = (event) => {
    const file = event.target.files[0];
    const data = new FormData();
    data.append('cover', file);
    data.append('id', this.props.job_id);
  
    axios.post('/users/uploadCover', data)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }


  render() {
    return (
      <div className="cover-form">
        <form id="2">
          <h1>Cover Letter:</h1>
          <input
            type="file"
            name="cover"
            id="input"
            onChange={this.handleFiles}
          ></input><br />
        </form>
      </div>
    );
  }
}

export default CoverLetterUpload;
