// container for user profile, edit user, user settings components.

import React, { Component } from 'react';
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
    const { activeUser, activeComponent } = this.state
    console.log(activeUser)

    return (
      <div className="user-container">
        <div className="user-top">
          <h3>{activeUser.first_name}</h3>
        </div>
        <nav className="user-navigation">
          <h3 onClick={this.toggleActive} id="overview">Overview</h3>
          <h3 onClick={this.toggleActive} id="account">Account</h3>
        </nav>
        <this.activeComponent activeComponent={activeComponent} />
      </div>
    );
  }
}

export default UserContainer;
