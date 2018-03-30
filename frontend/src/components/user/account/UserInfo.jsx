import React, { Component } from 'react';
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
      email_notification: false,
      phone_notification: false,
      notification_interval: 7,
      editing: false,
      infoSaved: false,
      notificationSaved: false
    };
  }
  componentDidMount() {
    const { activeUser } = this.props;
    this.setState({
      first_name: activeUser.first_name,
      last_name: activeUser.last_name,
      phone_number: activeUser.phone_number,
      newFirstName: '',
      newLastName: '',
      newPhoneNumber: '',
      email: activeUser.username,
      email_notification: activeUser.email_notification,
      phone_notification: activeUser.phone_notification,
      notification_interval: activeUser.notification_interval
    });
  }

  // Set notification settings by getting the data from backend
  // On checkbox, set state
  // On checkbox, update database with Y/N for notification settings

  toggleEdit = () => {
    const { editing, first_name, last_name, phone_number } = this.state;
    const { activeUser } = this.props;
    this.setState({
      editing: !editing,
      infoSaved: false
    });
    this.setState({
      newFirstName: first_name,
      newLastName: last_name,
      newPhoneNumber: phone_number
    });
  };

  handleReminderSelect = e => {
    this.setState({
      notification_interval: e.target.value,
      notificationSaved: false
    });
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleInfoSave = e => {
    e.preventDefault();
    const { newFirstName, newLastName, newPhoneNumber } = this.state;
    axios
      .put('/users/updateUserInfo', {
        firstName: newFirstName,
        lastName: newLastName,
        phoneNumber: newPhoneNumber
      })
      .then(res => {
        console.log(res);
        this.setState({
          first_name: newFirstName,
          last_name: newLastName,
          phone_number: newPhoneNumber,
          infoSaved: true,
          editing: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          message: 'Error saving'
        });
      });
  };

  handleCheckBoxChange = e => {
    this.setState({
      [e.target.name]: e.target.checked,
      notificationSaved: false
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
        this.setState({
          notificationSaved: true
        });
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const {
      email,
      notification_interval,
      email_notification,
      phone_notification,
      notificationSaved,
      editing,
      infoSaved
    } = this.state;

    const renderInfo = {
      firstName: editing ? this.state.newFirstName : this.state.first_name,
      lastName: editing ? this.state.newLastName : this.state.last_name,
      phoneNumber: editing ? this.state.newPhoneNumber : this.state.phone_number
    };

    return (
      <div className="user-account-container" data-aos="fade-up">
        <div className="user-info-container">
          <div className="user-info-header">
            <h3>Account Information</h3>
            {editing ? (
              <i
                onClick={this.toggleEdit}
                class="far fa-times-circle user-info-edit"
              />
            ) : (
              <i
                onClick={this.toggleEdit}
                className="far fa-edit user-info-edit"
              />
            )}
          </div>
          <div className="user-info-edit-container">
            <form>
              <div className="user-info-email">
                <h4> Email </h4>
                <input name="email" disabled type="text" value={email} />
              </div>
              <div className="user-info-first-name">
                <h4> First Name </h4>
                <input
                  name="newFirstName"
                  onChange={this.handleInput}
                  disabled={!editing}
                  type="text"
                  value={renderInfo.firstName}
                />
              </div>
              <div className="user-info-last-name">
                <h4> Last Name </h4>
                <input
                  name="newLastName"
                  onChange={this.handleInput}
                  disabled={!editing}
                  type="text"
                  value={renderInfo.lastName}
                />
              </div>
              <div className="user-info-phone-number">
                <h4> Phone Number</h4>
                <input
                  name="newPhoneNumber"
                  onChange={this.handleInput}
                  disabled={!editing}
                  type="text"
                  value={renderInfo.phoneNumber}
                />
              </div>
              {editing ? (
                <div className="save-button">
                  <button
                    className="user-info-save-button"
                    onClick={this.handleInfoSave}
                  >
                    Save
                  </button>
                </div>
              ) : null}
            </form>
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

            <p>Notify me through:</p>
            <label className="phone-notification-label">
              <input
                className="phone-notification-checkbox"
                type="checkbox"
                checked={phone_notification}
                name="phone_notification"
                onChange={this.handleCheckBoxChange}
              />
              <i class="far fa-comment-alt fa-2x" />
              SMS
            </label>
            <label className="email-notification-label">
              <input
                className="email-notification-checkbox"
                type="checkbox"
                checked={email_notification}
                name="email_notification"
                onChange={this.handleCheckBoxChange}
              />
              <i class="far fa-envelope fa-2x" />
              Email
            </label>
          </div>
          <div className="save-button">
            {notificationSaved ? (
              <h4 className="saved-message">
                Your preferences have been saved.
              </h4>
            ) : null}
            <button
              disable={notificationSaved}
              className="user-info-save-button"
              onClick={this.handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserInfo;
