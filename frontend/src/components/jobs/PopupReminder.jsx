import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class PopupReminder extends Component {
  render() {
    return (
      <div className="popup-reminder-container">
        <div>
          <i class="fas fa-info-circle fa-5x"></i>
        </div>
        <div className="reminder-content">
          <h3>Account Preferences</h3>
          <p>Don't forget to set your <Link to="/profile">reminder preferences</Link> for important dates.</p>
        </div>
        <div>
          <button onClick={this.props.toggleModal}><i class="fas fa-times fa-2x"></i></button>
        </div>
      </div>
    )
  }
}

export default PopupReminder;