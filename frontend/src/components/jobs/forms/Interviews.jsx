import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import PopupReminder from '../PopupReminder.jsx';
import Calendar from 'react-calendar';

import moment from 'moment';
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';

const str = 'HH:mm';

class Interviews extends Component {
  constructor() {
    super();
    this.state = {
      interviews: []
    };
  }

  componentDidMount() {
    const id = this.props.job_id;
    axios
      .get(`/users/getInterviews/${id}`)
      .then(data => {
        this.setState({ interviews: data.data.interviews });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { interviews } = this.state;

    return interviews.length > 0 ? (
      <div data-aos="fade-up" className="interviews-modal-container">
        <h1> Interviews </h1>
        <h3> All your interviews are here. </h3>
        {interviews.map((interview, index) => {
          return (
            <div className="interviews-info-container">
              <h3> Interview {index + 1} </h3>
              <div className="interviews-info">
                <div className="interviews-info-titles">
                  <h3>Date:</h3>
                  <h3>Time:</h3>
                  <h3>Contact:</h3>
                </div>
                <div className="interviews-info-details">
                  <h3> {moment(interview.interview_date).format("dddd, MMMM Do YYYY")}</h3>
                  <h3> {moment(interview.interview_time, 'HH:mm').format('hh:mm a')}</h3>
                  <h3> {interview.contact}</h3>
                </div>
              </div>
                <div className="interviews-notes">
                  <h3>Notes:</h3>
                  <div className="notes-text-area">
                    <p> {interview.note}</p>
                  </div>
                </div>
            </div>
          );
        })}
        <span className="modal-exit-button">
          <i onClick={this.props.toggleModal} class="fas fa-times fa-2x" />
        </span>
      </div>
    ) : (
      <h1>You haven't had any interviews for this job.</h1>
    );
  }
}

export default Interviews;
