import React, { Component } from 'react';
import axios from 'axios';

class UserBadges extends Component {
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
    const {recentAchieves} = this.props
    const showBadges = recentAchieves.map(achievement => (
      <div className="achievement-badge-container">
        {parseInt(hovered) === achievement.badge_id ? <div id={achievement.badge_id} className="badge-hovered"> <p> {achievement.badge_name} </p></div> : null }
      <img onMouseOver={this.toggleHover} onMouseLeave={this.toggleLeave} id={achievement.badge_id} src={achievement.badge_url} alt={achievement.badge_url} className="user-achievement-badge" />
      </div>
    ))

    return (
      <div className="user-badges-container" id="badges" data-aos="fade-up">
        <div className="user-badge-image-container">
          {showBadges}
        </div>
        <div className="more-badges-link-container">
         {!this.props.expanded ?  <h3 onClick={this.props.toggleExpand}>More Badges</h3>:<h3 onClick={this.props.toggleExpand}>Less Badges</h3>  }
        </div>
      </div>
    )
  }
}

export default UserBadges;
