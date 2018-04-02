import React, { Component } from 'react';

class JobSideBar extends Component {
  constructor() {
      super()
    this.state = {
      company: '',
      position: '',
      date: '',
      interview: ''
    };
  }
  componentDidMount() {
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
    
    date = mm + '-' + dd  + '-' +  yyyy

    this.setState({
      companyLogo: this.props.companyLogo,
      company: this.props.company,
      position: this.props.position,
      date_applied: date
    });
  }

  render() {
      const {comapnyLogo, company, position, date_applied} = this.state
    return (
      <div className="job-side-bar">
        <h3> {company} </h3>
        <h3> {position} </h3>
        <h3> {date_applied} </h3>
      </div>
    );
  }
}

export default JobSideBar;
