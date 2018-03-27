import React, { Component } from 'react';
import UserActivity from './UserActivity.jsx';
import UserProgress from './UserProgress.jsx';
import UserStats from './UserStats.jsx';
import UserBadges from './UserBadges.jsx';
import axios from 'axios';

class UserOverview extends Component {
  constructor() {
    super();
    this.state = {
      
    }
  }

  handleLogoutClick = () => {
    // modal 
    // Are you sure? 
    // Yes => this.props.logOut()
    // No => close modal 
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
        <div className="user-logout-container">
          <button onClick={this.props.logOut}>
            <i class="fas fa-power-off fa-2x"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default UserOverview;
