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
      userExperience: 10,
      achievements: [],
      rankBadge: ''
    };
  }

  componentDidMount() {
    this.setState({
      activeUser: this.props.activeUser
    });
    this.getUserExperience();
    this.getBadges();
  }

  getUserExperience = () => {
    console.log('getting user exp');

    axios
      .get('/users/getUserExp')
      .then(data => {
        let exp = data.data.data.experience;
        this.setState({
          userExperience: exp
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getBadges = () => {
    console.log('getting badges');

    axios
      .get('/users/getUserAchieves')
      .then(data => {
        let achievements = data.data.achieves;
        return achievements
      })
      .then(achievements => {
        let level = this.convertExperienceToLevel(this.state.userExperience);

        axios
          .get(`/users/getRankedBadge/${level}`)
          .then(data => {
            let rankBadge = data.data.badge;
            this.setState({
              achievements,
              rankBadge
            });
          })
          .catch(err => {
            console.log(err);
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
  }

  renderUserOverview = () => {
    const { activeUser, userExperience, achievements, rankBadge } = this.state;

    return <UserOverview
      activeUser={activeUser}
      userExperience={userExperience}
      achievements={achievements}
      rankBadge={rankBadge} />;
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
