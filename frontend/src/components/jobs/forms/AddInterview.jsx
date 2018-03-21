import React, { Component } from 'react';
import axios from 'axios';

class AddInterview extends Component {
  constructor() {
    super();
    this.state = {
      date: '',
      contact: '',
      note: ''
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
    const { date, contact, note } = this.state;
    let job_id = this.props.job_id;

    axios
      .post('/users/createInterview', {
        contact: contact,
        note: note,
        interview_date: date,
        job_id: job_id
      })
      .then(() => {
        this.setState({
          interviewSaved: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { date, contact, note, interviewSaved } = this.state;
    return (
      <div className="add-interview-form">
        <h3>Add Interview</h3>
        <form onSubmit={this.handleSubmit}>
          <p>Date</p>
          <input
            value={date}
            onChange={this.handleInput}
            name="date"
            type="date"
          />
          <p>Contact</p>
          <input
            value={contact}
            onChange={this.handleInput}
            name="contact"
            type="text"
          />
          <p>Note</p>
          <textarea value={note} onChange={this.handleInput} name="note" />
          <input disabled={interviewSaved || !date || !contact} type="submit" value="Save" />
        </form>
        <button
          disabled={!interviewSaved}
          onClick={this.props.addMoreInterview}
        >
          Add Another
        </button>
      </div>
    );
  }
}

export default AddInterview;
