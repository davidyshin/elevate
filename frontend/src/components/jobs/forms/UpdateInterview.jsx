import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import PopupReminder from '../PopupReminder.jsx';
import Calendar from 'react-calendar';

import moment from 'moment';
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';

const str = 'HH:mm';

class UpdateInterview extends Component {
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

  componentDidMount() {
    const { interview } = this.props;
    const date = new Date(interview.interview_date);
    this.setState({
      date: date,
      contact: interview.contact,
      note: interview.note,
      time: interview.interview_time
    });
  }

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
    this.setState({ date: date });
  };

  handleDate = time => {
    this.setState({ time: time });
    console.log(this.state)
  };

  handleSubmit = e => {
    e.preventDefault();
    const { date, contact, note, time } = this.state;
    let job_id = this.props.interview.job_id;

    axios
      .get('/users/getUserInterviews')
      .then(res => {
        let interviews = res.data.interviews;
        axios
          .put('/users/UpdateInterview', {
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

    return (
      <div data-aos="fade-up" className="update-interview-form">
        <form onSubmit={this.handleSubmit}>
          <h1>Update Interview</h1>
          <p>Interview Date: *</p>
          <Calendar onChange={this.handleDate} value={date} />
          <p>Interview Time: *</p>
          <TimePicker
            showSecond={false}
            defaultValue={moment()}
            onChange={this.handleTime}
            use12Hours
          />
          <p>Interview Contact: *</p>
          <input
            value={contact}
            className="update-contact-input"
            onChange={this.handleInput}
            name="contact"
            type="text"
          />
          <p>Note:</p>
          <div className="interview-note-area">
            <textarea
              value={note}
              placeholder="Note"
              onChange={this.handleInput}
              name="note"
            />
            <span className="pencil-icon">
              <i className="fas fa-pencil-alt fa-2x" />
            </span>
          </div>
          <div>
            <input
              disabled={interviewSaved || !time || !date || !contact}
              type="submit"
              value="Save"
            />
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

export default UpdateInterview;
