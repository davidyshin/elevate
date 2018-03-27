import React, { Component } from 'react';
import axios from 'axios';
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Label
} from 'recharts';

const COLORS = ['#9a177c', '#3A99D8', '#FFBB28'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const renderActiveShape = props => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text
        className="PieChartText"
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fontSize= '18'
        fill="#3A99D8"
      >
      Applications
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
        fontSize= '20'        
      >{`${payload.name}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fontSize= '12'        
        fill="#999"
      >
        {`${payload.value} Application (${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

class UserStats extends Component {
  constructor() {
    super();
    this.state = { jobList: [], data: [], activeIndex: 0 };
  }

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index
    });
  };
  componentDidMount() {
    axios
      .get('/users/getAllUserApps')
      .then(data => {
        let jobList = data.data.apps;
        let rejected = jobList.filter(job => job.job_status === 'rejected');
        let offered = jobList.filter(job => job.job_status === 'offered');
        let awaiting = jobList.filter(job => job.job_status === 'awaiting');
        let pieData = [
          { name: 'Rejected', value: rejected.length },
          { name: 'Offered', value: offered.length },
          { name: 'Awaiting', value: awaiting.length }
        ];

        this.setState({ jobList: jobList, data: pieData });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { data } = this.state;
    return data.length > 1 ? (
      <div className="user-stats-container" data-aos="fade-up">
        <h3>{this.props.activeUser.first_name}'s Stats</h3>
        <div className="user-stats">
          <PieChart width={600} height={400}>
            <Pie
              activeIndex={this.state.activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx={290}
              cy={160}
              onMouseEnter={this.onPieEnter}
              labelLine={false}
              innerRadius={80}
              outerRadius={100}
              fill="#8884d8"
            >
              {data.map((entry, index) => (
                <Cell fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
    ) : (
      <h1>Loading</h1>
    );
  }
}

export default UserStats;
