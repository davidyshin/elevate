// Container to hold everything AFTER user has logged in
import React, { Component } from "react";
import HomeNavBar from "./HomeNavBar.jsx";

class HomeContainer extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="home-container">
        <h1>Home Container</h1>
        <HomeNavBar />
      </div>
    );
  }
}

export default HomeContainer;
