import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Division from './components/Division';
import Database from './database/Database';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      db: new Database("vanilla")
    }
  }
  changeMod(modName) {
    this.setState({db: new Database(modName)});
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hearts of Iron IV - Division Designer</h1>
        </header>
        <Division db={this.state.db} />

        <div className="mod-selector">
          <span>Switch mod:</span>
          <button className="btn btn-primary" onClick={() => this.changeMod("vanilla")}>Vanilla</button>
          <button className="btn btn-primary" onClick={() => this.changeMod("kaiserreich")}>Kaiserreich</button>
          <button className="btn btn-primary" onClick={() => this.changeMod("millennium_dawn")}>Millennium Dawn</button>
        </div>
      </div>
    );
  }
}

export default App;
