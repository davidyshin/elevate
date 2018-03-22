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
      <div className="user-account-container" data-aos="fade-up">
        <div className="user-info-container">

          <div className="user-info-header">
            <h3>User Information</h3>
            <i onClick={this.toggleModal} className="far fa-edit user-info-edit"></i>
          </div>
          <div>
            <p>Name: {this.props.activeUser.first_name}</p>
            <p>Email: {this.props.activeUser.username}</p>
            <p>Phone number: {this.props.activeUser.phone_number}</p>
          </div>
          
        </div>

        <div className="user-settings-container">
          <h3>Notification Settings</h3>
          <div>
            <p>Send me an important reminder ______ before</p>
            <p>Notify me on my phone / email</p>
          </div>
        </div>

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
