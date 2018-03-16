import React, { Component } from 'react';
import AuthContainer from './auth/AuthContainer.jsx'
import '../stylesheets/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AuthContainer />
      </div>
    );
  }
}

export default App;
