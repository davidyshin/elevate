import React, { Component } from 'react';

class UserProgress extends Component {
  constructor() {
    super();
    this.state = {
      experienceEarned: 0,
      experienceNeededForNextLevel: 0,
      rankBadgeImageUrl: ''
    };
  }

  componentDidMount() {
    this.setState({
      experienceEarned: this.props.userExperience,
      experienceNeededForNextLevel: 2000,
      rankBadgeImageUrl: this.props.rankBadgeImageUrl
    });
  }

  render() { 
    const { experienceEarned, experienceNeededForNextLevel, rankBadgeImageUrl } = this.state; 
    const progressPercentage = (experienceEarned / experienceNeededForNextLevel) * 100; 
    console.log(this.state);

    var progressStyle = {
      width: `${progressPercentage}%`
    }

    return (
      <div className="user-progress-container">

        <div className="user-progress-header">
          <h3>Level Progress</h3>
        </div>

        <div className="user-progress-content">

          <div className="user-progress-left">

            <div className="user-progress-badge-container">
              <img src="rankBadgeImageUrl" alt="badge" class="user-progress-badge" />
              <img src="https://lh3.googleusercontent.com/1GmLSLTSH4LmI-xD5ZAYIG3DkJ4GVhAF15UbwzuPm2UgM0MvHR05_attKfkyOzJmS6kNfEXqO0wWzIzRP-FJ=w1438-h780" alt="badge" class="user-progress-badge badge-inactive" />
            </div>

            <div className="user-progress-bar-container">
              <div className="user-progress-bar-total">
                <div className="user-progress-bar-earned" style={progressStyle} />
                <p>{experienceEarned}/{experienceNeededForNextLevel}</p>
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
              <p>400 points more to next level!</p>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default UserProgress;
