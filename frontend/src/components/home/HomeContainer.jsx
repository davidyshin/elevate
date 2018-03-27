// Container to hold everything AFTER user has logged in
import React, { Component } from 'react';
import HomeNavBar from './HomeNavBar.jsx';
import JobsContainer from '../jobs/JobsContainer.jsx';
import AddJobForm from '../jobs/forms/AddJobForm.jsx'
import UpdateJobForm from '../jobs/forms/UpdateJobForm.jsx'
import UserContainer from '../user/UserContainer.jsx';
import UserInfo from '../user/account/UserInfo.jsx';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

class HomeContainer extends Component {
  constructor() {
    super();
    this.state = {
      experience: 0
    };
  }

  componentDidMount() {
    this.setState({
      experience: this.props.activeUser.experience
    });
  }

  updateExperience = exp => {
    let { experience } = this.state;
    let updatedExperience = experience + exp; 

    axios
      .put('/users/updateExperience', {
        experience: updatedExperience
      })
      .then(() => {
        this.setState({
          experience: updatedExperience 
        })
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderJobsContainer = () => {
    return <JobsContainer activeUser={this.props.activeUser} updateExperience={this.updateExperience} />;
  };

  renderUserContainer = () => {
    return <UserContainer activeUser={this.props.activeUser} logOut={this.props.logOut} />;
  };

  renderAddJobForm = () => {
    return <AddJobForm activeUser={this.props.activeUser} updateExperience={this.updateExperience} />;
  };

  renderUpdateJobForm = (props) => {
    return <UpdateJobForm activeUser={this.props.activeUser} job_id={props.match.params.job_id} updateExperience={this.updateExperience} />;
  };


  render() {
    console.log(this.state);
    return (
      <div className="home-container">
        <HomeNavBar experience={this.state.experience}/>
        <Route exact path="/" component={this.renderJobsContainer} />
        <Route exact path="/profile/" component={this.renderUserContainer} />
        <Route exact path="/addjob/" component={this.renderAddJobForm} />
        <Route exact path="/updateJob/:job_id" component={this.renderUpdateJobForm} />
      </div>
    );
  }
}

export default HomeContainer;
