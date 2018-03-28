import React, { Component } from 'react';
import AuthContainer from './auth/AuthContainer.jsx';
// Components
import HomeNavBar from './home/HomeNavBar.jsx';
import UserContainer from './user/UserContainer.jsx';
import UserInfo from './user/account/UserInfo.jsx';
import JobsContainer from './jobs/JobsContainer.jsx';
import AddJobForm from './jobs/forms/AddJobForm.jsx';
import UpdateJobForm from './jobs/forms/UpdateJobForm.jsx';
import Community from './community/Community.jsx';
import LeaderBoard from './leaderboard/LeaderBoard';
import { Route, Link, Switch, Redirect } from 'react-router-dom';

import axios from 'axios';
import '../stylesheets/App.css';
import AOS from 'aos';
import '../../node_modules/aos/dist/aos.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeUser: ''
    };
  }

  setActiveUser = user => {
    if (!user) {
      console.log('Error, user not found');
    }
    this.setState({
      activeUser: user
    });
  };

  logOut = () => {
    axios
      .get('/users/logout')
      .then(res => {
        this.setState({
          activeUser: ''
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
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
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderJobsContainer = () => {
    const { activeUser } = this.state;
    return (
      <JobsContainer
        activeUser={activeUser}
        updateExperience={this.updateExperience}
      />
    );
  };

  renderUserContainer = () => {
    const { activeUser } = this.state;
    return <UserContainer activeUser={activeUser} logOut={this.logOut} />;
  };

  renderAddJobForm = () => {
    const { activeUser } = this.state;
    return (
      <AddJobForm
        activeUser={activeUser}
        updateExperience={this.updateExperience}
      />
    );
  };

  renderUpdateJobForm = props => {
    const { activeUser } = this.state;
    return (
      <UpdateJobForm
        activeUser={activeUser}
        job_id={props.match.params.job_id}
        updateExperience={this.updateExperience}
      />
    );
  };

  renderLeaderBoard = () => {
    const { activeUser } = this.state;
    return <LeaderBoard activeUser={activeUser} />;
  };

  renderCommunity = () => {
    const { activeUser } = this.state;
    return <Community activeUser={activeUser} />;
  };

  componentDidMount() {
    const { activeUser } = this.state;
    axios
      .get('/users/getUser')
      .then(res => {
        this.setState({
          activeUser: res.data.user
        });
      })
      .catch(err => {
        console.log(`errrr`, err);
      });
  }

  renderActiveComponent = () => {
    const { activeUser } = this.state;
    return activeUser ? (
      <div className="home-container">
        <HomeNavBar experience={this.state.experience} />
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
    ) : (
      <AuthContainer setActiveUser={this.setActiveUser}/>
    );
  };

  render() {
    const { activeUser } = this.state;
    AOS.init({
      once: true
    });
    return (< this.renderActiveComponent />);
  }
}

export default App;
