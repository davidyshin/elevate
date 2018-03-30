import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import achieves from '../../achievements/checkForAchievements';
import PopupReminder from '../PopupReminder.jsx';

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
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
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

        if (interviews.length > 1) {
          axios
            .post('/users/createInterview', {
              contact: contact,
              note: note,
              interview_date: date,
              interview_time: time,
              job_id: job_id
            })
            .then(() => {
              this.setState({
                interviewSaved: true
              });
              this.props.saveInterview()
              this.props.updateExperience(50);
              achieves.checkInterviewNumber();
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          axios
            .post('/users/createInterview', {
              contact: contact,
              note: note,
              interview_date: date,
              interview_time: time,
              job_id: job_id
            })
            .then(() => {
              this.setState({
                interviewSaved: true,
                modalOpen: true 
              });
              this.props.saveInterview()
              this.props.updateExperience(50);
              achieves.checkInterviewNumber();
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => {
        console.log(err)
      })

  };

  render() {
    const { date, contact, note, time, interviewSaved } = this.state;

    return (
      <div className="add-interview-form">
        <form onSubmit={this.handleSubmit}>
          <h1>Add Interview</h1>
          <p>Interview Date</p>
          <input
            value={date}
            onChange={this.handleInput}
            name="date"
            type="date"
          />
          <p>Interview Time</p>
          <input
            value={time}
            onChange={this.handleInput}
            name="time"
            type="time"
          />
          <p>Interview Contact</p>
          <input
            value={contact}
            onChange={this.handleInput}
            name="contact"
            type="text"
          />
          <p>Note</p>
          <div className="interview-note-area">
            <div>
              <textarea
                value={note}
                placeholder="Note"
                onChange={this.handleInput}
                name="note"
              />
            </div>
            <span className="pencil-icon">
              <i className="fas fa-pencil-alt fa-2x" />
            </span>
          </div>
          <input
            disabled={interviewSaved || !date || !contact}
            type="submit"
            value="Save"
          />
        </form>

        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.toggleModal}
          contentLabel="popup-reminder-modal"
          className="popup-reminder-modal">
          <PopupReminder
            toggleModal={this.toggleModal} />
        </Modal>
      </div>
    );
  }
}

export default AddInterview;
