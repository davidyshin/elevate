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
      activeComponent: 'overview'
    };
  }

  componentDidMount() {
    this.setState({
      activeUser: this.props.activeUser
    });
  }

  renderUserOverview = () => {
    return <UserOverview activeUser={this.state.activeUser} logOut={this.props.logOut} />
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
          <h3>{activeUser.first_name} {activeUser.last_name}</h3>
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
