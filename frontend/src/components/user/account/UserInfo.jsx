// Edit User Page

import React, { Component } from 'react';
import Modal from 'react-modal';
import EditUser from './EditUser.jsx';

class UserInfo extends Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false
    };
  }
  toggleModal = () => {
    let { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen
    });
  };

  render() {
    return (
      <div className="user-info">
        <h1>{this.props.activeUser.username} User Info</h1>
        <h3 onClick={this.toggleModal}>Edit</h3>
        <Modal
          isOpen={this.state.modalOpen}
          contentLabel="Follower List"
          className="follows-modal"
        >
          <EditUser
            activeUser={this.props.activeUser}
            toggleModal={this.toggleModal}
          />
        </Modal>
      </div>
    );
  }
}

export default UserInfo;
