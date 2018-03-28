import React, { Component } from 'react';
import axios from 'axios';

class LeaderBoard extends Component {
  constructor() {
    super();
    this.state ={
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
      <div>
        <h1>Leaders!</h1>
        <ol>
          {top5.map(user => {
            return (
              <li id={user.id}>
               <h3> {user.first_name} {user.last_name[0]}. {user.experience}</h3>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
}

export default LeaderBoard;
