import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import PopupReminder from '../PopupReminder.jsx';


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
    const interview_date = date.toISOString().substring(0, 10);
    this.setState({
      date: interview_date,
      contact: interview.contact,
      note: interview.note,
      time: interview.interview_time
    });
  }

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
        console.log(err)
      })

  };


  render() {
    const { date, contact, note, time, interviewSaved } = this.state;

    return (
      <div className="update-interview-form">
        <form onSubmit={this.handleSubmit}>
          <h1>Update Interview</h1>
          <p>Interview Date: *</p>
          <div className="input-date-container">
          <input
            value={date}
            onChange={this.handleInput}
            name="date"
            type="date"
          />
          </div>
          <p>Interview Time: *</p>
          <input
            value={time}
            onChange={this.handleInput}
            name="time"
            type="time"
          />

          <p>Interview Contact: *</p>
          <input
            value={contact}
            onChange={this.handleInput}
            name="contact"
            type="text"
          />
          <p>Note:</p>
          <textarea value={note} onChange={this.handleInput} name="note" />
          <div>
          <input
            disabled={!time || !date || !contact}
            type="submit"
            value="Save"
          />
          <button
              className="add-interview-button"
              onClick={this.props.addMoreInterview}
              disabled={!this.state.interviewSaved}
            >
              <i class="fas fa-plus" />
            </button>
            </div>
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

export default UpdateInterview;
