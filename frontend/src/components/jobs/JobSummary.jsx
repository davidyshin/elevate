// ANALYTICs

import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

// DATE FUNCTIONS
var curr = new Date(); // get current date
var first = curr.getDate();
var firstday = new Date(curr.setDate(first)).toString();

class JobSummary extends Component {
  constructor() {
    super();
    this.state = {
      x: [],
      y: []
    };
  }

  componentDidMount() {
    axios.get('/users/getAllUserApps').then(data => {
      let weekobj = {};
      let y = [];
      for (var i = 0; i < 8; i++) {
        var next = new Date(curr.getTime());
        next.setDate(first - i);
        weekobj[next.toDateString()] = 0;
      }
      data.data.apps.forEach(app => {
        const date = new Date(app.date_logged);
        const dateString = date.toDateString();
        const x = Object.keys(weekobj);
        if (x.includes(dateString)) {
          weekobj[dateString] += 1;
        }
      });
      let keys = Object.keys(weekobj).reverse()
      let x = keys.map(date => {
        date = `${date.split(" ")[1]} ${date.split(" ")[2]}`
        return date
      })

      this.setState({
        x: x,
        y: Object.values(weekobj).reverse()
      });
    });
  }
  render() {
    const { x, y } = this.state;
    // var WIDTH_IN_PERCENT_OF_PARENT = 100

    return (
      <div className="job-summary">
        <Plot
          data={[
            {
              x: x,
              y: y,
              type: 'line+markers',
              marker: {
                color: 'rgba(58,200,225,.5)',
                line: {
                  color: 'rbg(8,48,107)'
                }
              },
              name: 'Job Applications Logged'
            }
          ]}
          layout={{
            width: 1200,
            height: 250,
            title: `${this.props.activeUser.first_name}'s Weekly Summary`,
            yaxis: { range: [0, Math.max(...y)+1 || 3] },
            xaxis: { zeroline: true },
            showlegend: true
          }}
        />
      </div>
    );
  }
}

export default JobSummary;
