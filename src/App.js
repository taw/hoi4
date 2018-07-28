import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Division from './components/Division';
import Database from './database/Database';

class App extends Component {
  constructor(props) {
    super(props);
    this.db = new Database();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hearts of Iron IV - Division Designer</h1>
        </header>
        <Division db={this.db} />
      </div>
    );
  }
}

export default App;
