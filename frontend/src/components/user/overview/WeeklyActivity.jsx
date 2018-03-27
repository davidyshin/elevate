import React, { Component } from 'react';
import JobSummary from '../../jobs/JobSummary.jsx'



class WeeklyActivity extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="user-activity-container" data-aos="fade-up">
        <h3>Weekly Activity</h3>
        <div className="user-activity-graph">
        <JobSummary activeUser={this.props.activeUser}/>
        </div>
      </div>
    )
  }
}

export default WeeklyActivity;
