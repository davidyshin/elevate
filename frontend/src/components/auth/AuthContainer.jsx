// Container for Login, SignUp and Splash components

import React, { Component } from 'react';
import LoginForm from './LoginForm.jsx';
import SignUpForm from './SignUpForm.jsx';
import SplashContainer from './SplashContainer.jsx';
import '../../stylesheets/home-nav-bar.css';

class AuthContainer extends Component {
  constructor() {
    super();
    this.state = {
      activeForm: ''
    };
  }

  activeComponent = props => {
    switch (props.activeForm) {
      case 'login':
        return <LoginForm setActiveUser={this.props.setActiveUser} />;
        break;
      case 'signup':
        return <SignUpForm setActiveUser={this.props.setActiveUser} />;
        break;
      case 'splash':
        return <SplashContainer
          setActiveUser={this.props.setActiveUser}
          toggleActive={this.toggleActive} />;
        break;
      default:
        return <SplashContainer
          setActiveUser={this.props.setActiveUser}
          toggleActive={this.toggleActive} />;
        break;
    }
  };

  toggleActive = e => {
    this.setState({
      activeForm: e.target.id
    });
  };

  render() {
    let { activeForm } = this.state;
    return (
      <div className="auth-container">
        <nav className="top-navigation">
          <div className="top-navigation-left">
            <img onClick={this.toggleActive} id="splash" src="https://lh6.googleusercontent.com/YxE58-MrxQVfwgXyyMaOJ4ExoDIO189HeORfF1SMbtdA0fZKDJRO_9xyVu1GEZEecgXHRMu5sapEzKjQSut4=w1440-h780" alt="elevate" />
          </div>
          <div className="top-navigation-right">
            <h3 onClick={this.toggleActive} id="login">LOGIN</h3>
            <h3 onClick={this.toggleActive} id="signup">SIGN UP</h3>
          </div>
        </nav>
        <this.activeComponent activeForm={activeForm} />
      </div>
    );
  }
}

export default AuthContainer;
