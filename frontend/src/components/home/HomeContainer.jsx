import React, { Component } from 'react';
// Components
import HomeNavBar from './HomeNavBar.jsx';
import UserContainer from '../user/UserContainer.jsx';
import UserInfo from '../user/account/UserInfo.jsx';
import JobsContainer from '../jobs/JobsContainer.jsx';
import AddJobForm from '../jobs/forms/AddJobForm.jsx';
import UpdateJobForm from '../jobs/forms/UpdateJobForm.jsx';
import Community from '../community/Community.jsx';
import LeaderBoard from '../leaderboard/LeaderBoard';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

class HomeContainer extends Component {
  constructor() {
    super();
    this.state = {
      experience: 0,
      coinAnimation: false
    };
  }

  componentDidMount() {
    this.setState({
      experience: this.props.activeUser.experience
    });
  }

  coinAnimationToggle = () => {
    this.setState({
      coinAnimation: true
    }, () => {
      setTimeout(() => {
        this.setState({
          coinAnimation: false
        })
      }, 3000);
    })
  }

  updateExperience = exp => {
    let { experience } = this.state;
    let updatedExperience = experience + exp;

    this.coinAnimationToggle();

    axios
      .put('/users/updateExperience', {
        experience: updatedExperience
      })
      .then(() => {
        this.setState({
          experience: updatedExperience,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderJobsContainer = () => {
    return (
      <JobsContainer
        activeUser={this.props.activeUser}
        updateExperience={this.updateExperience}
      />
    );
  };

  renderUserContainer = () => {
    return (
      <UserContainer
        activeUser={this.props.activeUser}
        logOut={this.props.logOut}
      />
    );
  };

  renderAddJobForm = () => {
    return (
      <AddJobForm
        activeUser={this.props.activeUser}
        updateExperience={this.updateExperience}
      />
    );
  };

  renderUpdateJobForm = props => {
    return (
      <UpdateJobForm
        activeUser={this.props.activeUser}
        job_id={props.match.params.job_id}
        updateExperience={this.updateExperience}
      />
    );
  };

  renderLeaderBoard = () => {
    return <LeaderBoard activeUser={this.props.activeUser} />;
  };

  renderCommunity = () => {
    return <Community activeUser={this.props.activeUser} />;
  };

  render() {
    console.log(this.state);

    return (
      <div className="home-container">
        <HomeNavBar experience={this.state.experience} coinAnimation={this.state.coinAnimation}/>
        <Route exact path="/" component={this.renderJobsContainer} />
        <Route exact path="/profile/" component={this.renderUserContainer} />
        <Route exact path="/addjob/" component={this.renderAddJobForm} />
        <Route
          exact
          path="/updateJob/:job_id"
          component={this.renderUpdateJobForm}
        />
        <Route exact path="/community" component={this.renderCommunity} />
        <Route exact path="/leaderboard" component={this.renderLeaderBoard} />
      </div>
    );
  }
}

export default HomeContainer;
