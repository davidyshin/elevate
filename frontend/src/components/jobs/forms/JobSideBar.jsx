import React, { Component } from 'react';

class JobSideBar extends Component {
  constructor() {
    super();
  }

  render() {
    var date = new Date(this.props.date_applied);
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    date = mm + '-' + dd + '-' + yyyy;

    const {
      comapnyLogo,
      company,
      position,
      resume_url,
      cover_url
    } = this.props;

    return (
      <div className="job-side-bar">
        <h3> {company} </h3>
        <h3> {position} </h3>
        <h3>Applied on: {date} </h3>
        {resume_url ? (
          <a
            href={`https://s3.amazonaws.com/elevateresumes/${resume_url}`}
            target="_blank"
          >
            <h3>Download your resume</h3>
          </a>
        ) : null}
        {cover_url ? (
          <a
            href={`https://s3.amazonaws.com/elevatecovers/${cover_url}`}
            target="_blank"
          >
            <h3>Download your cover letter</h3>
          </a>
        ) : null}
      </div>
    );
  }
}

export default JobSideBar;
