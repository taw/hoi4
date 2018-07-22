import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Division from './components/Division';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hearts of Iron IV - Division Designer</h1>
        </header>
        <Division />
      </div>
    );
  }
}

export default App;
