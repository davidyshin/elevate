// Container to hold everything AFTER user has logged in
import React, { Component } from 'react';
import HomeNavBar from './HomeNavBar.jsx';
import JobsContainer from '../jobs/JobsContainer.jsx';
import UserContainer from '../user/UserContainer.jsx';
import UserSettings from '../user/account/UserSettings.jsx';
import EditUser from '../user/account/EditUser.jsx';
import { Route, Link, Switch, Redirect } from 'react-router-dom';

class HomeContainer extends Component {
  constructor() {
    super();
    this.state = {
      activeUser: ''
    };
  }

  // componentDidMount() {
  //   this.setState({
  //     activeUser: this.props.activeUser
  //   });
  // }

  renderJobsContainer = () => {
    return <JobsContainer activeUser={this.props.activeUser} />;
  };
  renderUserContainer = () => {
    return <UserContainer activeUser={this.props.activeUser} />;
  };
  renderEditUser = () => {
    return <EditUser activeUser={this.props.activeUser} />;
  };
  renderUserSettings = () => {
    return <UserSettings activeUser={this.props.activeUser} />;
  };

  render() {
    return (
      <div className="home-container">
        <h1>{this.state.activeUser.username}</h1>
        <HomeNavBar />
        <Route exact path="/" component={this.renderJobsContainer} />
        <Route exact path="/profile/settings" component={this.renderUserSettings} />
        <Route exact path="/profile/edit" component={this.renderEditUser} />
        <Route exact path="/profile/" component={this.renderUserContainer} />
      </div>
    );
  }
}

export default HomeContainer;
