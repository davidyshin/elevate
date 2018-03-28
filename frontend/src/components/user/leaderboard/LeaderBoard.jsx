import React, { Component } from 'react';
import axios from 'axios';
import leaderboard from '/Users/c4q/Documents/capstone/elevate/frontend/src/components/user/leaderboard/leaderboard.css'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
const data = [{
  name: 'LBJ',
  age: 30000,
  friend: {
    name: 'Jason Maurer',
    age: 3000,
  }
},{
  name: 'Wade',
  age: 5000,
  friend: {
    name: 'Jason Maurer',
    age: 80,
  }
}, {
  name: 'Kobe',
  age: 60000,
  friend: {
    name: 'Jason Maurer',
    age: 29,
  }
},  {
  name: 'Magic',
  age: 800000,
  friend: {
    name: 'Jason Maurer',
    age: 29,
  }
}, {
  name: 'Shaq',
  age: 120000,
  friend: {
    name: 'Jason Maurer',
    age: 23,
  }
}]

const columns = [{
  Header: 'Rank',
  accessor: 'rank', // String-based value accessors!
  Cell: props => <span className='number'>{(props.index) + 1} </span>,
  minWidth: 150, // Custom cell components!
  
}, {
  id: 'friendName',
  Header: 'Name',
  accessor: d => d.first_name +' '+ d.last_name  , // String-based value accessors!
  minWidth: 50 ,// Custom cell components!
  minWidth: 150 ,// Custom cell components!
  // accessor: ''  
}, {
  Header: 'Experience',
  accessor: 'experience',
  Cell: props => <span className='number'>{props.value} </span> ,
  minWidth: 150 ,// Custom cell components!
  sortable: false,

},
]
class LeaderBoard extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      top5: []
    }
  }
  componentDidMount() {
    axios
      .get('/users/getLeaders')
      .then(res => {
        this.setState({
          user: this.props.activeUser,
          top5: res.data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const { top5 } = this.state;
    return (
      <div className='LeaderboardDiv'>
        <br/>
      <div  className='Leaderboard'>
        <h1>Leaders!</h1>
      </div>
        {/* <ol>
          {top5.map(user => {
            return (
              <div className='leaderboard_position'>
              <li id={user.id}>

               <h3> {user.first_name} {user.last_name[0]}{' '}{user.experience}</h3>
              </li>
              </div>
            );
          })}
        </ol> */}

        <ReactTable
        getTrProps={(state, rowInfo, column) => { 
        //  { console.log(rowInfo.row._index)}
        //  const rowIndex = rowInfo.row._index
          return {
            style: {
              background: 'lightgrey',
              opacity: 0.7,
              'text-align': 'center',
              'font-weight': 'bold' ,
              'font-size' : '1.5em',
            }
          }
        }}
          data={top5}
          columns={columns}
          showPagination={false}
          defaultPageSize={5}
          resizable={false}
        />
        <br/>
        <br/>
        <br/>
      </div>
    );
  }
}

export default LeaderBoard;
