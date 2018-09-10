import React, { Component } from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Division from "./components/Division";
import Database from "./database/Database";
import ModSelector from './components/ModSelector';

class App extends Component {
  state = {
    db: new Database("vanilla")
  }
  changeMod = (modName) => {
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
        <ModSelector changeMod={this.changeMod} />
      </div>
    );
  }
}

export default App;
