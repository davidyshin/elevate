import React, { Component } from 'react';
import axios from 'axios';

class MoreBadges extends Component {
  constructor() {
    super();
    this.state = {
      hovered: '',
      achievements: []
    };
  }

  toggleHover = (e) => {
    this.setState({ hovered: e.target.id })
  }
  toggleLeave = (e) => {
    this.setState({ hovered: ''})
  }

  render() {
    const {hovered} = this.state
    const {achievements} = this.props
    const showBadges = achievements.map(achievement => (
      <div className="more-achievement-badge-container">
        {parseInt(hovered) === achievement.badge_id ? <div id={achievement.badge_id} className="badge-hovered"> <p> {achievement.badge_name} </p></div> : null }
      <img onMouseOver={this.toggleHover} onMouseLeave={this.toggleLeave} id={achievement.badge_id} src={achievement.badge_url} alt={achievement.badge_url} className="more-user-achievement-badge" />
      </div>
    ))

    return (
      <div className="user-badges-container" id="badges" data-aos="fade-up">
          {showBadges}
      </div>
    )
  }
}

export default MoreBadges;
