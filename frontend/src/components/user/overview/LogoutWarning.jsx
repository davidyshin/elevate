import React, { Component } from 'react';


class LogoutWarning extends Component {
  render() {
      return (
          <div className="logout-warning-container">
              <h3>Are you sure you want to log out?</h3>
              <button onClick={this.props.logOut} className="logout-button">Logout</button>
              <button onClick={this.props.toggleModal} className="logout-cancel-button">Cancel</button>
          </div>
        )
    }
}

export default LogoutWarning