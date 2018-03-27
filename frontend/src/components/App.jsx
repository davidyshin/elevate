import React, { Component } from 'react';
import AuthContainer from './auth/AuthContainer.jsx';
import HomeContainer from './home/HomeContainer.jsx';
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


  activeComponent = () => {
    // activeUser is the logged in user, if it exists it will render the homepage of the user
    // else it will render the login/register page
    // Also, we're sending down activeUser down to each child component so we can use its data
    const { activeUser } = this.state;

    return activeUser ? (
      <HomeContainer logOut={this.logOut} activeUser={activeUser} />
    ) : (
        <AuthContainer setActiveUser={this.setActiveUser} />
      );
  };

  render() {
    AOS.init({
      once: true
    });

    return (
      <div className="App">
        <this.activeComponent />
      </div>
    );
  }
}

export default App;
