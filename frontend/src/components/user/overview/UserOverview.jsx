import React, { Component } from 'react';
import WeeklyActivity from './WeeklyActivity.jsx';
import UserProgress from './UserProgress.jsx';
import UserStats from './UserStats.jsx';
import UserBadges from './UserBadges.jsx';
import JobSummary from '../../jobs/JobSummary.jsx'

import Modal from 'react-modal';
import axios from 'axios';

class LogoutWarning extends Component {
  render() {
    return (
      <div className="logout-warning-container">
        <h3>Are you sure you want to log out?</h3>
        <button onClick={this.props.logOut} className="logout-button">Logout</button>
        <button onClick={this.props.toggleModal} className="logout-cancel-button">Cancel</button>
      </div>
    )
  }
}

class UserOverview extends Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false
    }
  }

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }

  renderUserProgress = () => {
    return <UserProgress activeUser={this.props.activeUser} />
  };

  renderUserBadges = () => {
    return <UserBadges activeUser={this.props.activeUser} />;
  }

  renderWeeklyActivity = () => {
    return <WeeklyActivity activeUser={this.props.activeUser}/>
  };

  renderUserStats = () => {
    return <UserStats activeUser={this.props.activeUser} />;
  };

  render() {
    return (
      <div className="user-overview-container">
        <this.renderUserProgress />
        <this.renderUserBadges />
        <this.renderUserStats />        
        <this.renderWeeklyActivity />
        <div className="user-logout-container">
          <button onClick={this.toggleModal}>
            <i class="fas fa-power-off fa-2x"></i>
          </button>
        </div>

        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.toggleModal}
          contentLabel="logout-warning-modal"
          className="logout-warning-modal"
        >
          <LogoutWarning
            toggleModal={this.toggleModal}
            logOut={this.props.logOut}
          />
        </Modal>
      </div>
    );
  }
}

export default UserOverview;
