import React, { Component } from 'react';

class UserStats extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="user-stats-container" data-aos="fade-up">
        <h3>Weekly Stats</h3>
        <div className="user-stats-chart">
          <p>Bar graph or a line graph</p>
          <p>That is the question</p>
        </div>
      </div>
    )
  }
}

export default UserStats;
