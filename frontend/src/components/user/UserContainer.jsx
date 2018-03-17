// container for user profile, edit user, user settings components.

import React, { Component } from 'react';
import UserOverview from './overview/UserOverview.jsx';
import UserInfo from './account/UserInfo.jsx';

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
    const {activeComponent} = this.state

    return (
      <div className="user-container">
        <h3 onClick={this.toggleActive} id="overview">
          Overview
        </h3>
        {'   '}
        <h3 onClick={this.toggleActive} id="account">
          Account
        </h3>
        <this.activeComponent activeComponent={activeComponent} />
      </div>
    );
  }
}

export default UserContainer;
