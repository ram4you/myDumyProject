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

    this.pages = [
      <Login  change={this.changePage} />,
      <Register  change={this.changePage} />,
      <Dashboard  change={this.changePage} />,
      <UserBasicDetails change={this.changePage} />
    ];

  }

  changePage = (i) => {
    this.setState({
      pagename: i
    })
  }

  loadComp = (i) => {
    return this.pages[i];
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
