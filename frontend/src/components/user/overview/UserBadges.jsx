import React, { Component } from 'react';

class UserBadges extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
        <div className="user-badges-container" id="badges">
            <div className="user-badge-image-container">
                <img src="" alt="badge" class="user-progress-badge" />
                <img src="" alt="badge" class="user-progress-badge" />
                <img src="" alt="badge" class="user-progress-badge" />
            </div>
            <h3>More Badges</h3>
        </div>
    )
  }
}

export default UserBadges;
