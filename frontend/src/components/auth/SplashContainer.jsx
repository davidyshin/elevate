import React, { Component } from 'react';
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
      <div className="splash-container">

        <div className="splash-top">
          <h1>Elevate</h1>
          <p>Elevate is the most rewarding job application tracker.</p>
          <div className="splash-top-button-container">
            <button>Demo</button>
            <button id="signup" onClick={this.props.toggleActive}>Create an account</button>
          </div>
        </div>

        <div className="splash-features">

          <div className="splash-feature-card">
            <div>
              <img src="https://i.imgur.com/u7NyCxx.png" alt="feature-1" />
            </div>
            <p>Never forget an interview date.</p>
          </div>

          <div className="splash-feature-card">
            <div>
              <img src="https://i.imgur.com/WB9xBxu.png" alt="feature-2" />
            </div>
            <p>Earn experience points towards your success.</p>
          </div>

          <div className="splash-feature-card">
            <div>
              <img src="https://i.imgur.com/IDI6oFc.png" alt="feature-3" />
            </div>
            <p>Weekly summary on your search progress.</p>
          </div>
        </div>

        <div className="splash-footer">
          <a href="https://github.com/davidyshin/elevate" target="_blank"><i className="fab fa-github fa-5x"></i></a>
        </div>

      </div>
    );
  }
}

export default SplashContainer;