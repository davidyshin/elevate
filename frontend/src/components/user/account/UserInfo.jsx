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
        <h3 onClick={this.toggleModal}>Edit</h3>
        <h2>Welcome {this.props.activeUser.first_name}</h2>
        <h2>Email: {this.props.activeUser.username}</h2>
        <h2>Phone Number: {this.props.activeUser.phone_number}</h2>

        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.toggleModal}
          contentLabel="edit-user-modal"
          className="edit-user-modal"
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
