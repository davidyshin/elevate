import React, { Component } from 'react';
import UserActivity from './UserActivity.jsx';
import UserProgress from './UserProgress.jsx';
import UserStats from './UserStats.jsx';
import UserBadges from './UserBadges.jsx';

class UserOverview extends Component {
  constructor() {
    super();
    this.state = {
      userExperience: 10,
      rankBadge: ''
    }
  }

  componentDidMount() {
    this.setState({
      userExperience: this.props.userExperience,
      rankBadge: this.props.rankBadge
    })
  }

  renderUserProgress = () => {
    return this.state.rankBadge ?
      <UserProgress activeUser={this.props.activeUser} userExperience={this.state.userExperience} rankBadge={this.state.rankBadge} />
      :
      <div />;
  };

  renderUserBadges = () => {
    return <UserBadges activeUser={this.props.activeUser} achievements={this.props.achievements} />;
  }

  renderUserActivity = () => {
    return <UserActivity activeUser={this.props.activeUser} />;
  };

  renderUserStats = () => {
    return <UserStats activeUser={this.props.activeUser} />;
  };

  render() {
    // console.log(this.state);
    console.log(this.state.rankBadge);

    return (
      <div className="user-overview-container">
        <this.renderUserProgress />
        <this.renderUserBadges />
        <this.renderUserActivity />
        <this.renderUserStats />
      </div>
    );
  }
}

export default UserOverview;
