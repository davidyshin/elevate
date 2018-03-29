import React, { Component } from 'react';
import WeeklyActivity from './WeeklyActivity.jsx';
import UserProgress from './UserProgress.jsx';
import UserStats from './UserStats.jsx';
import UserBadges from './UserBadges.jsx';
import JobSummary from '../../jobs/JobSummary.jsx'
import MoreBadges from './MoreBadges.jsx'
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
      modalOpen: false,
      expanded: false,
      achievements: [],
      allAchievements: []
    }
  }
  componentDidMount() {
      axios
        .get('/users/getUserAchieves')
        .then(data => {
          let achievements = data.data.achieves;
          this.setState({
            achievements: achievements
          });
        })
        .catch(err => {
          console.log(err);
        })
      axios.get('/users/getAllAchievementBadges')
      .then(data=> {
        let allAchievements = data.data.all_achievements
        this.setState({
          allAchievements
        })
      })
  }

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }
  toggleExpand = () => {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  renderUserProgress = () => {
    return <UserProgress activeUser={this.props.activeUser} />
  };

  renderUserBadges = () => {
    const {achievements, expanded} = this.state
    const recentAchieves = achievements.sort((a,b) => a.badge_id > b.badge_id).slice(-3).reverse()
    return <UserBadges activeUser={this.props.activeUser} recentAchieves={recentAchieves} toggleExpand={this.toggleExpand} expanded={expanded}/>;
  }

  renderMoreBadges = () => {
    const {allAchievements, achievements} = this.state
    const userAchieves = achievements.sort((a,b) => {a.badge_id<b.badge_id}).slice(0, achievements.length-3)
    return <MoreBadges activeUser={this.props.activeUser} allAchievements={allAchievements} achievements={achievements} />;
  }

  renderWeeklyActivity = () => {
    return <WeeklyActivity activeUser={this.props.activeUser}/>
  };

  renderUserStats = () => {
    return <UserStats activeUser={this.props.activeUser} />;
  };

  render() {
    const {expanded} = this.state
    return (
      <div className="user-overview-container">
        <this.renderUserProgress />
        <this.renderUserBadges />
        {expanded ? <this.renderMoreBadges /> : null}
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
