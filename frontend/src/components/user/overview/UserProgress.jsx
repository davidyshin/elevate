import React, { Component } from 'react';

class UserProgress extends Component {
  constructor() {
    super();
    this.state = {
      experienceEarned: 10,
      experienceNeededForNextLevel: 0,
      rankBadge: 'nothing',
      lockedBadgeUrl: 'https://i.imgur.com/aVEGmKm.png'
    };
  }

  componentDidMount() {
    this.setState({
      experienceEarned: this.props.userExperience,
      rankBadge: this.props.rankBadge
    })
  }

  componentWillReceiveProps() {
    console.log('progress receiving props');
    this.setState({
      experienceEarned: this.props.userExperience,
      rankBadge: this.props.rankBadge
    })
  }

  // componentDidMount() {
  //   this.setState({
  //     experienceEarned: this.props.userExperience,
  //     experienceNeededForNextLevel: 2000,
  //     rankBadge: this.props.rankBadge
  //   });
  // }

  render() { 
    const { experienceEarned, experienceNeededForNextLevel, rankBadge, lockedBadgeUrl } = this.state; 
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
              <img src={rankBadge.badge_url} alt={rankBadge.badge_name} class="user-progress-badge" />
              <img src={lockedBadgeUrl} alt="badge" class="user-progress-badge badge-inactive" />
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
              <p>{experienceNeededForNextLevel - experienceEarned} points more to next level!</p>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default UserProgress;
