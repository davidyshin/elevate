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
      plotData: []
    };
  }

  componentDidMount() {
    axios
      .get('/users/getAllUserApps')
      .then(data => {
        let { plotData } = this.state;

        for (var i = 0; i < 8; i++) {
          var next = new Date(curr.getTime());
          next.setDate(first - i);
          let obj = {};
          obj.date = next.toDateString().substring(0, 10);
          obj['Applications Logged'] = 0;
          plotData.push(obj);
        }
        data.data.apps.forEach(app => {
          const date = new Date(app.date_logged);
          const dateString = date.toDateString();
          let index = plotData.findIndex(
            plot => plot.date === dateString.substring(0, 10)
          );
          if (index > -1) {
            plotData[index]['Applications Logged'] += 1;
          }
        });
        this.setState({
          plotData
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { plotData } = this.state;
    return plotData.length > 1 ? (
      <div className="job-summary-container">
        <h1>{this.props.activeUser.first_name}'s Weekly Activity</h1>
        <ResponsiveContainer height={225}>
          <LineChart data={plotData.reverse()}>
            <XAxis dataKey="date" />
            <YAxis dataKey="Applications Logged" />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Line
              type="monotone"
              dataKey="Applications Logged"
              stroke="#ff7300"
              yAxisId={0}d
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    ) : (
      <div>
        {' '}
        <h1>Loading</h1>{' '}
      </div>
    );
  }
}

export default JobSummary;
