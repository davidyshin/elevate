// container for user profile, edit user, user settings components.

import React, { Component } from 'react';
import UserProfile from './overview/UserProfile.jsx';
class UserContainer extends Component {
  constructor() {
    super();
    this.state = {
      activeUser: ''
    };
  }
  componentDidMount() {
    this.setState({
      activeUser: this.props.activeUser
    });
  }

  renderUserProfile = () => {
    return <UserProfile activeUser={this.state.activeUser} />;
  }
  
  render() {
    console.log(this.state)
    return (
      <div className="user-container">
        <h1>User Container</h1>
        <this.renderUserProfile />
      </div>
    );
  }
}

export default UserContainer;
