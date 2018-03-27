import React, { Component } from 'react';
import UserActivity from './UserActivity.jsx';
import UserProgress from './UserProgress.jsx';
import UserStats from './UserStats.jsx';
import UserBadges from './UserBadges.jsx';
import axios from 'axios';

class UserOverview extends Component {
  constructor() {
    super();
    this.state = {}
  }

  renderUserProgress = () => {
    return <UserProgress activeUser={this.props.activeUser} />
  };

  renderUserBadges = () => {
    return <UserBadges activeUser={this.props.activeUser} />;
  }

  renderUserActivity = () => {
    return <UserActivity activeUser={this.props.activeUser} />;
  };

  renderUserStats = () => {
    return <UserStats activeUser={this.props.activeUser} />;
  };

  render() {
    return (
      <div className="user-overview-container">
        <this.renderUserProgress />
        <this.renderUserBadges />
        <this.renderUserActivity />
        <this.renderUserStats />
        <button onClick={this.props.logOut}>
          <i class="fas fa-power-off fa-2x"></i>
        </button>
      </div>
    );
  }
}

export default UserOverview;
