import React, { Component } from 'react';
import Login from './login/login.js';
import Dashboard from './dashboard/dashboard.js';
import Register from './Register/Register.js';
import UserBasicDetails from './UserBasicDetails/UserBasicDetails.js';
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      'pagename': 0
    };
  }

  changePage = (i, data) => {
    this.setState({
      pagename: i,
      data
    })
  }

  loadComp = (i) => {
    switch(i) {
      case 0: {
        return <Login  change={this.changePage} />
      }
      case 1: {
        return <Register  change={this.changePage} />
      }
      case 2: {
        return <Dashboard data = { this.state.data } change={this.changePage} />
      }
      case 3: {
        return <UserBasicDetails change={this.changePage} />
      }
    }
  }

  nav = () => {
    return (
      <div >
        <p onClick={() => { this.changePage(0) }} >Login Page</p>
        {/* <p onClick = { () => { this.changePage(1) } }>Dashboard Page</p> */}
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.loadComp(this.state.pagename)}
      </div>
    )
  }

}

export default App;
