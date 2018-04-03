import React, { Component } from 'react';
import '../../../stylesheets/jobs-sidebar.css';

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
      companyLogo,
      company,
      position,
      resume_url,
      cover_url
    } = this.props;

    const resume = resume_url ? (
      <a
        href={`https://s3.amazonaws.com/elevateresumes/${resume_url}`}
        target="_blank">
        <h3><i class="far fa-arrow-alt-circle-down"></i> resume</h3>
      </a>
    ) : null;

    const cover = cover_url ? (
      <a
        href={`https://s3.amazonaws.com/elevatecovers/${cover_url}`}
        target="_blank">
        <h3><i class="fas fa-download"></i> cover letter</h3>
      </a>
    ) : null;

    return (
      <div className="job-sidebar">
        <div className="sidebar-top">
          {/* <div className="company-logo">
            <img src={companyLogo} />
          </div> */}
          <div className="company-container">
            <img src={companyLogo} />
            <h3 className="company">{company}</h3>
          </div>
          <h3 className="position">{position}</h3>
          <h3 className="applied-date">{date}</h3>
        </div>
        <div className="sidebar-bottom">
          <div className="sidebar-left">
          </div>
          <div className="sidebar-right">
            {resume}
            {cover}
          </div>
        </div>
      </div>
    );
  }
}

export default JobSideBar;
