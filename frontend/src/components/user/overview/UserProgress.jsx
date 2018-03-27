import React, { Component } from 'react';
import axios from 'axios';

class UserProgress extends Component {
  constructor() {
    super();
    this.state = {
      userExperience: 0,
      experienceToNextLevel: 0,
      rankBadge: '',
      lockedBadgeUrl: 'https://i.imgur.com/HxuzkQX.png'
    };
  }

  componentDidMount() {
    this.getUserExperience();
  }

  getUserExperience = () => {
    axios
      .get('/users/getUserExp')
      .then(data => {
        let exp = data.data.data.experience;
        return exp;
      })
      .then(exp => {
        this.getRankBadge(exp);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getRankBadge = exp => {
    let level = this.convertExperienceToLevel(exp);
    let levelExperience = this.getExperienceToNextLevel(level);

    axios
      .get(`/users/getRankedBadge/${level}`)
      .then(data => {
        let rankBadge = data.data.badge;
        this.setState({
          userExperience: exp,
          experienceToNextLevel: levelExperience,
          rankBadge: rankBadge
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  convertExperienceToLevel = exp => {
    switch (true) {
      case (exp < 2000):
        return '1';
        break;
      case (exp < 4000):
        return '2';
        break;
      case (exp < 6000):
        return '3';
        break;
      case (exp < 8000):
        return '4';
        break;
      case (exp < 10000):
        return '5';
        break;
      case (exp < 12000):
        return '5';
        break;
      case (exp < 14000):
        return '6';
        break;
      case (exp < 16000):
        return '7';
        break;
      case (exp < 18000):
        return '8';
        break;
      case (exp < 20000):
        return '9';
        break;
      default:
        return '1';
        break;
    }
  }

  getExperienceToNextLevel = level => {
    return parseInt(level) * 2000;
  }

  render() {
    const { userExperience, experienceToNextLevel, rankBadge, lockedBadgeUrl } = this.state;
    const progressPercentage = (userExperience / experienceToNextLevel) * 100;

    var progressStyle = {
      width: `${progressPercentage}%`
    }

    return (
      <div className="user-progress-container" data-aos="fade-up">

        <div className="user-progress-header">
          <h3>Level Progress</h3>
        </div>

        <div className="user-progress-content">

          <div className="user-progress-left">

            <div className="user-progress-badge-container">
              <img src={rankBadge.badge_url} alt={rankBadge.badge_name} className="user-rank-badge" />
              <img src={lockedBadgeUrl} alt="badge" className="user-rank-badge badge-inactive" />
            </div>

            <div className="user-progress-bar-container">
              <div className="user-progress-bar-total">
                <div className="user-progress-bar-earned" style={progressStyle} />
                <p>{userExperience} / {experienceToNextLevel}</p>
              </div>
            </div>
          </div>

          <div className="user-progress-right">
            <div className="user-progress-blank" />
            <div className="user-progress-current">
              <h3>Current Level</h3>
              <h4>Novice</h4>
            </div>
            <div className="user-progress-next">
              <h3>Next Level</h3>
              <h4>Amateur</h4>
            </div>
            <div className="user-progress-message">
              <p>{experienceToNextLevel - userExperience} points more to next level!</p>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default UserProgress;
