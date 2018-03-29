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

  toggleHover = e => {
    this.setState({ hovered: e.target.id });
  };
  toggleLeave = e => {
    this.setState({ hovered: '' });
  };

  render() {
    const { hovered } = this.state;
    const { achievements, allAchievements } = this.props;
    const shownBadges = achievements.slice(-3);
    const userBadges = achievements.slice(0, achievements.length - 3);
    const remainingBadges = allAchievements.filter(
      achieve =>
        shownBadges.findIndex(
          userBadge => userBadge.badge_id === achieve.badge_id
        ) < 0
    );

    const allBadges = remainingBadges.map(allBadges => {
      if (
        userBadges.findIndex(
          userBadge => userBadge.badge_id === allBadges.badge_id
        ) > -1
      ) {
        return (
          <div className="more-achievement-badge-container">
            {parseInt(hovered) === allBadges.badge_id ? (
              <div id={allBadges.badge_id} className="badge-hovered">
                {' '}
                <p> {allBadges.badge_name} </p>
              </div>
            ) : null}
            <img
              onMouseOver={this.toggleHover}
              onMouseLeave={this.toggleLeave}
              id={allBadges.badge_id}
              src={allBadges.badge_url}
              alt={allBadges.badge_url}
              className="more-user-achievement-badge"
            />
          </div>
        );
      } else {
        return (
          <div className="more-achievement-badge-container">
            {parseInt(hovered) === allBadges.badge_id ? (
              <div id={allBadges.badge_id} className="badge-hovered">
                {' '}
                <p> {allBadges.badge_name} </p>
              </div>
            ) : null}
            <img
              onMouseOver={this.toggleHover}
              onMouseLeave={this.toggleLeave}
              id={allBadges.badge_id}
              src={allBadges.badge_url}
              alt={allBadges.badge_url}
              className="more-user-achievement-badge badge-obtained"
            />
          </div>
        );
      }
    });

    return (
      <div
        className="more-user-badges-container"
        id="badges"
        data-aos="fade-down"
      >
        {allBadges}
      </div>
    );
  }
}

export default MoreBadges;
