import React, { Component } from 'react';

class UserActivity extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="user-activity-container" data-aos="fade-up">
        <h3>User Activity</h3>
        <div className="user-activity-graph">
          <p>Charts!</p>
          <p>Legends!</p>
          <p>John Legend!</p>
        </div>
      </div>
    )
  }
}

export default UserActivity;
