import React, { Component } from 'react';
import axios from 'axios';

class UserBadges extends Component {
  constructor() {
    super();
    this.state = {
      achievements: []
    };
  }

  componentDidMount() {
    this.getAchievementBadges();
  }

  getAchievementBadges = () => {
    axios
      .get('/users/getUserAchieves')
      .then(data => {
        let achievements = data.data.achieves;
        this.setState({
          achievements
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    const { achievements } = this.state;

    const showBadges = achievements.map(achievement => (
      <img src={achievement.badge_url} alt={achievement.badge_url} className="user-progress-badge" />
    ))

    return (
      <div className="user-badges-container" id="badges">
        <div className="user-badge-image-container">
          {showBadges}
        </div>
        <h3>More Badges</h3>
      </div>
    )
  }
}

export default UserBadges;
