import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import achieves from '../../achievements/checkForAchievements';
import PopupReminder from '../PopupReminder.jsx';
import Calendar from 'react-calendar';
import '../../../stylesheets/jobs-interview.css';

class AddInterview extends Component {
  constructor() {
    super();
    this.state = {
      date: '',
      contact: '',
      note: '',
      time: '',
      interviewSaved: false,
      modalOpen: false
    };
  }

  /* contact: req.body.contact,
  note: req.body.note,
  job_id: req.body.job_id,
  interview_date: req.body.interview_date */

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleDate = date => {
    this.setState({
      date: date
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { date, contact, note, time } = this.state;
    let job_id = this.props.job_id;

    axios
      .get('/users/getUserInterviews')
      .then(res => {
        let interviews = res.data.interviews;

        axios
          .post('/users/createInterview', {
            contact: contact,
            note: note,
            interview_date: date,
            interview_time: time,
            job_id: job_id
          })
          .then(() => {
            if (interviews.length > 0) {
              // modal doesn't open
              this.setState({
                interviewSaved: true
              });
            } else {
              // modal opens for popup message
              this.setState({
                interviewSaved: true,
                modalOpen: true
              });
            }
            this.props.updateExperience(50);
            achieves.checkInterviewNumber();
            {
              this.props.saveInterview();
            }
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { date, contact, note, time, interviewSaved } = this.state;
    const toggleButton = interviewSaved ? (
      <button className="saved-button">
        <i class="fas fa-check fa" />
      </button>
    ) : (
      <button
        type="button"
        className="add-interview-save-button"
        onClick={this.handleSubmit}
        disabled={!date || !time || !contact}
      >
        Save
      </button>
    );

    return (
      <div data-aos="fade-up" className="add-interview-form">
        <form onSubmit={this.handleSubmit}>
          {/* <h1>Interview</h1> */}
          <div className="add-interview-input-pairs-container">
            <div className="add-interview-labels-container">
              <div>
                <p className="add-interview-date-label">Interview Date *</p>
              </div>
              <p className="add-interview-time-label">Interview Time *</p>
              <p className="add-interview-contact-label">Contact *</p>
              <p className="add-interview-notes-label">Notes</p>
            </div>
            <div className="add-interview-inputs-container">
              <div className="add-interview-date">
                <Calendar onChange={this.handleDate} value={date} />
              </div>
              <div className="add-interview-time">
                <input
                  value={time}
                  onChange={this.handleInput}
                  name="time"
                  type="time"
                />
              </div>
              <div className="add-interview-contact">
                <input
                  value={contact}
                  onChange={this.handleInput}
                  name="contact"
                  type="text"
                />
              </div>
              <div className="add-interview-notes">
                <div className="interview-note-area">
                  <textarea
                    value={note}
                    placeholder="Notes about the upcoming interview..."
                    onChange={this.handleInput}
                    name="note"
                  />
                  <span className="pencil-icon">
                    <i className="fas fa-pencil-alt fa-2x" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="add-interview-buttons">
            {toggleButton}
            <button
              className="add-interview-next-button"
              disabled={!interviewSaved}
              onClick={
                this.props.backToHome
                  ? this.props.backToHome
                  : this.props.handleSkipButton
              }
              type="button"
            >
              {this.props.backToHome ? 'Back' : 'Next'}
            </button>
          </div>
        </form>

        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.toggleModal}
          contentLabel="popup-reminder-modal"
          className="popup-reminder-modal"
        >
          <PopupReminder toggleModal={this.toggleModal} />
        </Modal>
      </div>
    );
  }
}

export default AddInterview;
