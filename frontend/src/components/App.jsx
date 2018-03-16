import React, { Component } from 'react';
import AuthContainer from './auth/AuthContainer.jsx';
import HomeContainer from './home/HomeContainer.jsx';
import '../stylesheets/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeUser: false
    };
  }

  componentDidMount() {
    // should check auth for activeUser or loggedIn
    // this.checkLoggedIn()
  }

  checkActiveUser() {
    console.log('This should check if user is active (logged in or not)');
  }

  activeComponent = props => {
    return props.activeUser ? <HomeContainer /> : <AuthContainer />;
  };

  render() {
    return (
      <div className="App">
        <this.activeComponent activeUser={this.state.activeUser} />
      </div>
    );
  }
}

export default App;
