import React, { Component } from 'react';
import axios from 'axios';

class AddInterview extends Component {
  constructor() {
    super();
    this.state = {
      date: '',
      contact: '',
      note: '',
      time: '',
      interviewSaved: false
    };
  }

  /* contact: req.body.contact,
  note: req.body.note,
  job_id: req.body.job_id,
  interview_date: req.body.interview_date */

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
        this.props.updateExperience(50);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { date, contact, note, time, interviewSaved } = this.state;
    return (
      <div className="add-interview-form">
        <form onSubmit={this.handleSubmit}>
        <h1>Add Interview</h1>
          <p>Date</p>
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
          <p>Contact</p>
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
            <span className="pencil-icon"><i class="fas fa-pencil-alt fa-2x"></i></span>
          </div>
          <input
            disabled={interviewSaved || !date || !contact}
            type="submit"
            value="Save"
          />
          <button
          className="add-interview-button"
          disabled={!interviewSaved}
          onClick={this.props.addMoreInterview}
        >
          Add Another
        </button>
        </form>

      </div>
    );
  }
}

export default AddInterview;
