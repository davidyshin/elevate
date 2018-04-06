import React, { Component } from 'react';
import WeeklyActivity from './WeeklyActivity.jsx';
import UserProgress from './UserProgress.jsx';
import UserStats from './UserStats.jsx';
import UserBadges from './UserBadges.jsx';
import MoreBadges from './MoreBadges.jsx';
import LogoutWarning from './LogoutWarning.jsx';
import Modal from 'react-modal';
import axios from 'axios';


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
      .then(response => {
        let {achieves} = response.data;
        this.setState({
          achievements: achieves
        });
      })
      .catch(err => {
        console.log(err);
      })
    axios.get('/users/getAllAchievementBadges')
      .then(response => {
        let {all_achievements} = response.data
        this.setState({
          allAchievements: all_achievements
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
    const { achievements, expanded } = this.state
    const recentAchieves = achievements.sort((a, b) => a.badge_id > b.badge_id).slice(-5).reverse()
    return <UserBadges activeUser={this.props.activeUser} recentAchieves={recentAchieves} toggleExpand={this.toggleExpand} expanded={expanded} />;
  }

  renderMoreBadges = () => {
    const { allAchievements, achievements, expanded } = this.state;
    const className = expanded ? 'more-user-badges-container' : 'more-user-badges-hidden';
    const badgeVisibilityClass = expanded ? 'more-achievement-badge-container-expand' : null;
    const userAchieves = achievements.sort((a, b) => { a.badge_id < b.badge_id }).slice(0, achievements.length - 5)
    return <MoreBadges
      className={className}
      badgeVisibilityClass={badgeVisibilityClass}
      activeUser={this.props.activeUser}
      allAchievements={allAchievements}
      achievements={achievements} />;
  }

  renderWeeklyActivity = () => {
    return <WeeklyActivity activeUser={this.props.activeUser} />
  };

  renderUserStats = () => {
    return <UserStats activeUser={this.props.activeUser} />;
  };

  render() {
    const { expanded } = this.state
    return (
      <div className="user-overview-container">
        <this.renderUserProgress />
        <this.renderUserBadges />
        <this.renderMoreBadges />
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
