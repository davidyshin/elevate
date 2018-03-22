// ANALYTICs

import React, { Component } from 'react';
import Plot from 'react-plotly.js';

// DATE FUNCTIONS
var curr = new Date(); // get current date
var first = curr.getDate();
var firstday = new Date(curr.setDate(first)).toString();
let week = [];
for (var i = 0; i < 8; i++) {
  var next = new Date(curr.getTime());
  next.setDate(first - i);
  week.push(next.toDateString());
}
console.log(week.reverse());

class JobSummary extends Component {
  constructor() {
    super();
    this.state = {
      test: ""
    };
  }
  render() {
    return (
      <div className="job-summary">
        {' '}
        <Plot
          data={[
            {
              x: week,
              y: [0, 0, 0, 0, 0, 0, 0, 0],
              type: 'line',
              marker: {
                color: 'rgba(58,200,225,.5)',
                line: {
                  color: 'rbg(8,48,107)',
                  width: 1
                }
              }
            }
          ]}
          layout={{
            width: 800,
            height: 240,
            title: `${this.props.activeUser.first_name}'s Weekly Summary`
          }}
        />
      </div>
    );
  }
}

export default JobSummary;
