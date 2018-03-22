// list of all jobs user has applied to
import React, { Component } from 'react';
import axios from 'axios';
import JobItem from './JobItem.jsx';

class JobList extends Component {
  constructor() {
    super();
    this.state = {
      jobList: []
    };
  }

  componentDidMount() {
    axios
      .get('/users/getAllUserApps')
      .then(data => {
        this.setState({
          jobList: data.data.apps
        });
      })
      .catch(err => {
        console.log(`Error getting all user job applications: `, err);
      });
  }

  render() {
    const { jobList } = this.state;
    return (
      <div className="job-list">
        <h3>List of applied jobs</h3>
        <ol>{jobList.map(job => {
          return <li><JobItem job={job} /></li>;
        })}</ol>
      </div>
    );
  }
}

export default JobList;
