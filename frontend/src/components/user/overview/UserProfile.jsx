// Add Job Form

import React, { Component } from 'react';
import UserActivity from './UserActivity.jsx';
import UserProgress from './UserProgress.jsx';
import UserStats from './UserStats.jsx';

class UserProfile extends Component {
  constructor() {
    super();
  }
  
  renderUserActivity = () => {
    return <UserActivity activeUser={this.props.activeUser} />;
  };
  renderUserProgress = () => {
    return <UserProgress activeUser={this.props.activeUser} />;
  };
  renderUserStats = () => {
    return <UserStats activeUser={this.props.activeUser} />;
  };

  render() {
    return (
      <div ClassName="user-profile">
        <h1> {this.props.activeUser.username} User Profile</h1>
        <this.renderUserProgress />
        <this.renderUserActivity />
        <this.renderUserStats />
      </div>
    );
  }
}

export default UserProfile;
