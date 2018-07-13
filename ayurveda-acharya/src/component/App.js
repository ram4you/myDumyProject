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
        return <UserBasicDetails data = { this.state.data } change={this.changePage} />
      }
    }
  }

  nav = () => {
    const { pagename } = this.state;
    return (
      <div className="nav">
        { 
          pagename !== 0 ? (
            <span onClick={() => { this.changePage(0) }} >Back</span>
          ) 
          : <span>Home</span>
        }
      </div>
    )
  }

  render() {
    return (
      <div className="main">
        { this.nav() }
        <div className="freespace" contentEditable>Clipboard</div>
        {this.loadComp(this.state.pagename)}
      </div>
    )
  }
}

export default App;
