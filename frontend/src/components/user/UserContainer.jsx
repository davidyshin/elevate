import React, { Component } from 'react';
import axios from 'axios';
import UserOverview from './overview/UserOverview.jsx';
import UserInfo from './account/UserInfo.jsx';
import '../../stylesheets/user-main.css';

class UserContainer extends Component {
  constructor() {
    super();
    this.state = {
      activeUser: '',
      activeComponent: 'overview',
      userExperience: 0,
      achievements: []
    };
  }

  componentDidMount() {
    this.setState({
      activeUser: this.props.activeUser
    }, () => {
      this.getUserExperience();
    });
  }

  getUserExperience = () => {
    // Get user experience => axios.get('/getUserExp')
    axios
      .get('/users/getUserExp')
      .then(data => {
        let exp = data.data.data.experience;
        this.setState({
          userExperience: exp
        });
      })
      .then(() => {
        this.getAchievementBadges();
        this.getRankBadge();
      })
      .catch(err => {
        console.log(err);
      });
  }

  getAchievementBadges = () => {
    axios
      .get('/users/getUserAchieves')
      .then(data => {
        let achieves = data.data.achieves;
        this.setState({
          achievements: achieves
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getRankBadge = () => {
    let level = this.convertExperienceToLevel(this.state.userExperience);

    axios
      .get(`/users/getRankedBadge/${level}`)
      .then(data => {
        let badgeUrl = data.data.badge.badge_url;
        this.setState({
          rankBadgeImageUrl: badgeUrl
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  convertExperienceToLevel = exp => {
    switch (true) {
      case (exp < 1000):
        return '1';
        break;
      case (exp < 2000):
        return '2';
        break;
      case (exp < 3000):
        return '3';
        break;
      case (exp < 5000):
        return '4';
        break;
      case (exp < 7000):
        return '5';
        break;
      case (exp < 10000):
        return '5';
        break;
      default:
        return '6';
        break;
    }
    // Experience         Level 
    // 0 ~ 999            1 
    // 1000 ~ 1999        2
    // 2000 ~ 2999        3
    // 3000 ~ 4999        4
    // 5000 ~ 6999        5
    // 7000 ~ 9999        6
    // 10000 ~ ... 
  }

  renderUserOverview = () => {
    return <UserOverview activeUser={this.state.activeUser} />;
  };

  renderUserInfo = () => {
    return <UserInfo activeUser={this.state.activeUser} />;
  };

  activeComponent = props => {
    switch (props.activeComponent) {
      case 'overview':
        return <this.renderUserOverview />;
        break;
      case 'account':
        return <this.renderUserInfo />;
        break;
    }
  };

  toggleActive = e => {
    this.setState({
      activeComponent: e.target.id
    });
  };

  render() {
    const { activeUser, activeComponent } = this.state;
    console.log(this.state);

    return (
      <div className="user-container">
        <div className="user-top">
          <img src={activeUser.photo_url} alt={activeUser.first_name} />
          <h3>{activeUser.first_name}</h3>
        </div>
        <nav className="user-navigation">
          <h3 className={`overview ${activeComponent === 'overview' ? 'active' : null}`} onClick={this.toggleActive} id="overview">Overview</h3>
          <h3 className={`account ${activeComponent === 'account' ? 'active' : null}`} onClick={this.toggleActive} id="account">Account</h3>
        </nav>
        <this.activeComponent activeComponent={activeComponent} />
      </div>
    );
  }
}

export default UserContainer;
