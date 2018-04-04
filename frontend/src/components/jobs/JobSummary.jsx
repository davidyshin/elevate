// Data visualization

import React, { Component } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
  YAxis,
  ResponsiveContainer
} from 'recharts';

// DATE FUNCTIONS
var curr = new Date(); // get current date
var first = curr.getDate();
var firstday = new Date(curr.setDate(first)).toString();

class JobSummary extends Component {
  constructor() {
    super();
    this.state = {
      plotData: [],
    };
  }

  componentDidMount() {
    axios
      .get('/users/getAllUserApps')
      .then(data => {
        let { plotData } = this.state;
        let apps = data.data.apps;
        for (var i = 0; i < 7; i++) {
          var next = new Date(curr.getTime());
          next.setDate(first - i);
          let dateObj = {};
          let offeredObj = {};
          let rejectedObj = {};
          // making 3 separate objects for date line, offered line, rejected line
          // with past 7 days of the week
          dateObj.date = next.toDateString().substring(0, 10);
          offeredObj.date = next.toDateString().substring(0, 10);
          rejectedObj.date = next.toDateString().substring(0, 10);

          dateObj['Applications Logged'] = 0;
          dateObj['Offered'] = 0;
          dateObj['Rejected'] = 0;
          // Each array now has an object with every day of the week
          // example: {date: Thurs March 23, Applications Logged: 0}
          // example: {date: Thurs March 23, Offered: 0}
          // example: {date: Thurs March 23, Rejected: 0}

          plotData.push(dateObj);
        }
        apps.forEach(app => {
          const date = new Date(app.date_logged);
          const dateString = date.toDateString();
          let index = plotData.findIndex(
            plot => plot.date === dateString.substring(0, 10)
          );
          if (index > -1) {
            plotData[index]['Applications Logged'] += 1;
          }
          if (index > -1 && app.job_status === 'offered') {
            plotData[index]['Offered'] += 1;
          }
          if (index > -1 && app.job_status === 'rejected') {
            plotData[index]['Rejected'] += 1;
          }
        });

        this.setState({
          plotData: plotData.reverse(),
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { plotData} = this.state;
    return plotData.length > 1 ? (
      <div className="job-summary-container">
        <h1>{this.props.activeUser.first_name}'s Weekly Activity</h1>
        <ResponsiveContainer height={225}>
          <LineChart data={plotData}>
            <XAxis dataKey="date" />
            <YAxis dataKey="Applications Logged" />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Line
              type="monotone"
              dataKey="Applications Logged"
              stroke="#3a99d8"
              yAxisId={0}
              d
            />
            <Line
              type="monotone"
              dataKey="Offered"
              stroke="#00e000"
              yAxisId={0}
              d
            />
            <Line
              type="monotone"
              dataKey="Rejected"
              stroke="#ff4242"
              yAxisId={0}
              d
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    ) : (
      <div data-aos="fade-up">
        {' '}
        <h1>Loading</h1>{' '}
      </div>
    );
  }
}

export default JobSummary;
