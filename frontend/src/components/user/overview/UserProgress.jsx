// Add Job Form

import React, { Component } from 'react';

class UserProgress extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="user-progress-container">
        <div className="user-progress-header">
          <h3>Level Progress</h3>
        </div>
        <div className="user-progress-content">
          <div className="user-progress-left">
            <div className="user-progress-badge-container">
              <img src="https://lh3.googleusercontent.com/1GmLSLTSH4LmI-xD5ZAYIG3DkJ4GVhAF15UbwzuPm2UgM0MvHR05_attKfkyOzJmS6kNfEXqO0wWzIzRP-FJ=w1438-h780" alt="badge" class="user-progress-badge" />
              <img src="https://lh3.googleusercontent.com/1GmLSLTSH4LmI-xD5ZAYIG3DkJ4GVhAF15UbwzuPm2UgM0MvHR05_attKfkyOzJmS6kNfEXqO0wWzIzRP-FJ=w1438-h780" alt="badge" class="user-progress-badge" />
            </div>
            <div className="user-progress-bar-container">
              <div className="user-progress-bar-total">
                <div className="user-progress-bar-earned" />
              </div>
            </div>
          </div>
          <div className="user-progress-right">
            <h3>Current Level</h3>
            <p>Novice</p>
            <h3>Next Level</h3>
            <p>Amateur</p>
            <p>XXX more to next level!</p>
          </div>
        </div>
      </div>
    )
  }
}

export default UserProgress;
