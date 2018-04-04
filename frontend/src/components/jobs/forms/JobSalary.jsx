import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class JobSalary extends Component {
  constructor() {
    super();
    this.state = {
      job_id: '',
      salary: '',
      salarySaved: false
    };
  }

  componentDidMount() {
    this.setState({
      job_id: this.props.job_id,
      salary: this.props.salary || ''
    });
  }

  handleSalarySave = e => {
    e.preventDefault();
    const { salary, job_id } = this.state;
    axios
      .put('/users/updateJobSalary', {
        job_id: job_id,
        salary: salary
      })
      .then(() => {
        this.setState({
          salarySaved: true
        });
      })
      .catch(err => console.log(err));
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value,
      salarySaved: false
    });
  };

  render() {
    const { salary, salarySaved } = this.state;
    return (
      // <div className="salary-input-form-container">
      <div className="salary-input-form" data-aos="fade-up">
        <div className="salary-input-form-title">
          <h1>What was the offer?</h1>
          <h3>Log the salary information below</h3>
        </div>
        <div className="salary-input-container">
          <h3>Salary:</h3>
          <input
            name="salary"
            type="text"
            onChange={this.handleInput}
            value={salary}
            placeholder="$68,000"
            className="salary-input"
          />
        </div>

        <div className="salary-input-button-container">
          <button
            className={
              salarySaved ? 'job-salary-buttons-saved' : ' job-salary-buttons'
            }
            onClick={this.handleSalarySave}
            disabled={salary.length < 1}>
            {salarySaved ? <i class="fas fa-check fa" /> : 'Save'}
          </button>
          <Link to="/">
            <button className="job-salary-buttons">Return Home</button>
          </Link>
        </div>
      </div>
      // </div>
    );
  }
}

export default JobSalary;
