import React, { Component } from 'react';
import Modal from 'react-modal';
import EditUser from './EditUser.jsx';
import axios from 'axios';

class Select extends React.Component {
  render() {
    const { values, selectedValue, handleSelect, email, phone } = this.props;
    const displayValues = ['', ...values];

    return (
      <select
        className="select-interval-option"
        value={selectedValue}
        onChange={handleSelect}
        disabled={!email && !phone}
      >
        {displayValues.map(val => <option value={val}>{val}</option>)}
      </select>
    );
  }
}

class UserInfo extends Component {
  constructor() {
    super();
    this.interval = [1, 3, 7];

    this.state = {
      modalOpen: false,
      email_notification: false,
      phone_notification: false,
      notification_interval: 7
    };
  }
  componentDidMount() {
    const { activeUser } = this.props;
    this.setState({
      email_notification: activeUser.email_notification,
      phone_notification: activeUser.phone_notification,
      notification_interval: activeUser.notification_interval
    });
  }

  // Set notification settings by getting the data from backend
  // On checkbox, set state
  // On checkbox, update database with Y/N for notification settings

  toggleModal = () => {
    let { modalOpen } = this.state;
    this.setState({
      modalOpen: !modalOpen
    });
  };

  handleReminderSelect = e => {
    this.setState({
      notification_interval: e.target.value
    });
  };

  handleCheckBoxChange = e => {
    this.setState({
      [e.target.name]: e.target.checked
    });
  };

  handleSave = e => {
    const {
      notification_interval,
      email_notification,
      phone_notification
    } = this.state;
    axios
      .put('/users/updateNotification', {
        notification_interval,
        email_notification,
        phone_notification
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const {
      notification_interval,
      email_notification,
      phone_notification
    } = this.state;

    return (
      <div className="user-account-container" data-aos="fade-up">
        <div className="user-info-container">
          <div className="user-info-header">
            <h3>Account Information</h3>
            <i
              onClick={this.toggleModal}
              className="far fa-edit user-info-edit"
            />
          </div>
          <div>
            <p>
              Name: {this.props.activeUser.first_name}{' '}
              {this.props.activeUser.last_name}
            </p>
            <p>Email: {this.props.activeUser.username}</p>
            <p>Phone number: {this.props.activeUser.phone_number}</p>
          </div>
        </div>

        <div className="user-settings-container">
          <h3>Notification Settings</h3>
          <div>
            <p>
              Send me an important reminder
              <Select
                values={this.interval}
                selectedValue={notification_interval}
                handleSelect={this.handleReminderSelect}
                email={email_notification}
                phone={phone_notification}
              />{' '}
              days before every interview.
            </p>

            <p>Notify me on my:</p>
            <label className="phone-notification-label">
              <input
                className="phone-notification-checkbox"
                type="checkbox"
                checked={phone_notification}
                name="phone_notification"
                onChange={this.handleCheckBoxChange}
              />
              Phone
            </label>
            <label className="email-notification-label">
              <input
                className="email-notification-checkbox"
                type="checkbox"
                checked={email_notification}
                name="email_notification"
                onChange={this.handleCheckBoxChange}
              />
              Email
            </label>
          </div>
          <div className="save-button">
          <button className="user-info-save-button"onClick={this.handleSave}>Save</button>
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
