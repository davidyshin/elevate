import React, { Component } from 'react';
import About from './About.jsx';
import '../../stylesheets/auth.css';

class SplashContainer extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="splash-container" data-aos="fade-up">
        <div className="splash-top">
          <div className="splash-top-image">
            <img src="https://i.pinimg.com/564x/74/c2/0b/74c20b6f02246e9ea025e6b07a6c0d22.jpg" />
          </div>
          <div className="splash-top-info">
            <div className="splash-top-info-title">
              <img
                src="https://i.imgur.com/JdYm85w.png"
                alt="elevate"
              />
              <h1>Elevate</h1>
            </div>
            <p>Elevate your job search experience.</p>
            <div className="splash-top-button-container">
              <button id="signup" onClick={this.props.toggleActive}>
                Create an account
              </button>
              <button id="demo" onClick={this.props.toggleActive}>
                Demo
              </button>
            </div>
          </div>
        </div>{/* End above the fold content */}

        <div className="splash-features-container">
          <h3 className="splash-feature-title">Learn about our features</h3>

          <div className="splash-features">
            <div className="splash-feature-card">
              <div>
                <img src="https://i.imgur.com/u7NyCxx.png" alt="feature-1" />
              </div>
              <h3>Notifications</h3>
              <p>Never forget an interview date.</p>
            </div>

            <div className="splash-feature-card">
              <div>
                <img src="https://i.imgur.com/WB9xBxu.png" alt="feature-2" />
              </div>
              <h3>Rewards</h3>
              <p>Earn experience points towards your success.</p>
            </div>

            <div className="splash-feature-card">
              <div>
                <img src="https://i.imgur.com/IDI6oFc.png" alt="feature-3" />
              </div>
              <h3>Progress</h3>
              <p>Weekly summary on your search progress.</p>
            </div>
          </div>

        </div>

        <About />


        <div className="splash-footer">
          <a href="https://github.com/davidyshin/elevate" target="_blank">
            <i className="fab fa-github fa-5x" />
          </a>
        </div>

      </div>
    );
  }
}

export default SplashContainer;
