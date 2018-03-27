// ANALYTICs

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

class CustomizedLabel extends Component {
  render() {
    const { x, y, fill, value } = this.props;
    return (
      <text
        x={x}
        y={y}
        dy={-4}
        fontSize="16"
        fontFamily="sans-serif"
        fill={fill}
        textAnchor="middle"
      >
        Applications Submitted
      </text>
    );
  }
}

class JobSummary extends Component {
  constructor() {
    super();
    this.state = {
      plotData: []
    };
  }

  componentDidMount() {
    axios.get('/users/getAllUserApps').then(data => {
      let { plotData } = this.state;

      for (var i = 0; i < 8; i++) {
        var next = new Date(curr.getTime());
        next.setDate(first - i);
        let obj = {};
        obj.date = next.toDateString();
        obj.Applications = 0;
        plotData.push(obj);
      }
      data.data.apps.forEach(app => {
        const date = new Date(app.date_logged);
        const dateString = date.toDateString();
        let index = plotData.findIndex(plot => plot.date === dateString);
        if (index > -1) {
          plotData[index].Applications += 1;
        }
      });
      this.setState({
        plotData
      });
    });
  }
  render() {
    const { plotData } = this.state;
    const label = 'Job Applications Submitted';
    return (
      plotData.length > 1 ? 
      <div className="job-summary-container">
        <h1>{this.props.activeUser.first_name}'s Weekly Activity</h1>
        <ResponsiveContainer height={225}>
          <LineChart label={<CustomizedLabel />} data={plotData.reverse()}>
            <XAxis dataKey="date" />
            <YAxis dataKey="Applications" />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Line
              type="monotone"
              dataKey="Applications"
              stroke="#ff7300"
              yAxisId={0}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      :
      <div> <h1>Loading</h1> </div>
    );
  }
}

export default JobSummary;
