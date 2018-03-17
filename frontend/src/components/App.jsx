import React, { Component } from 'react';
import AuthContainer from './auth/AuthContainer.jsx';
import HomeContainer from './home/HomeContainer.jsx';
import '../stylesheets/App.css';

const mockUser = {
  id: 1,
  username: 'doge',
  email: 'y.davidshin@gmail.com',
  phone_number: '3478030075',
  experience: 999
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeUser: 'mockUser'
    };
  }

  componentDidMount() {
    //call fetchUser() here fetch user function to set activeUser to logged in User
  }

  /* 
  fetchUser() { 
    Function to make axios call to backend to retriever AUTHENTICATED user.
    This function will be passed down to child components that EDIT user so that we can 
    re-state the activeUser once edits happen.
  } 
  */

  activeComponent = () => {
    // activeUser is the logged in user, if it exists it will render the homepage of the user
    // else it will render the login/register page
    // Also, we're sending down activeUser down to each child component so we can use it's data
    const { activeUser } = this.state;

    return activeUser ? (
      <HomeContainer activeUser={activeUser} />
    ) : (
      <AuthContainer />
    );
  };

  render() {
    return (
      <div className="App">
        <this.activeComponent />
      </div>
    );
  }
}

export default App;
