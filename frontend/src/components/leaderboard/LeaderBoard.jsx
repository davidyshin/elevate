import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import '../../stylesheets/leaderboard.css';

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
    const { top5 , user} = this.state;
    const columns = [{
      Header: 'Rank',
      accessor: 'rank', // String-based value accessors!
      Cell: props => <span className='number'>{(props.index) + 1} </span>,
      minWidth: 120, // Custom cell components!
      maxWidth: 220, // Custom cell components!
      // show:false
    
    }, {
      id: 'name',
      Header: 'Name',
      accessor: d => d.id === user.id ? (<span><img className='avatar' src={user.photo_url} alt='user photo'/>    You </span>) : (<span><img className='avatar' src={d.photo_url} alt='user photo'/>{'    '+d.first_name+ '  '+ d.last_name}</span>), // String-based value accessors!
      minWidth: 50,// Custom cell components!
      minWidth: 250,// Custom cell components!
      // accessor: ''  
    }, {
      Header: 'Experience',
      accessor: 'experience',
      Cell: props => <span className='number'>{props.value} </span>,
      minWidth: 120,// Custom cell components!
      sortable: false,
    
    },
    ]
console.log(user, top5)




    return  top5.length > 4 ? (
      <div className='main' data-aos='fade-up'>
      <div className='LeaderboardDiv'>
        <br />
        <div className='Leaderboard'>
          <h1>Leaderboard</h1>
        </div>
        <br/>
        <ReactTable 
          getTrProps={(state, rowInfo, column, index) => {
             const rowIndex = rowInfo.row._index
            return {
              style: {
                background: rowIndex % 2 == 0  ? 'white' :'lightgrey',
                opacity: 0.7,
                'text-align': 'center',
                'font-weight': 'bold',
                'font-size': '1.5em',
              }
            }
          }}
          className='stripp'
          data={top5}
          columns={columns}
          showPagination={false}
          defaultPageSize={5}
          resizable={false}
        />
        <br/>
        <br />
      </div>
      
      </div>
    ) : (<h1> Loading </h1>)
  }
}

export default LeaderBoard;
