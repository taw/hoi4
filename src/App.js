import React, { Component } from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Division from "./components/Division";
import Database from "./database/Database";

class App extends Component {
  dbs = {
    vanilla: new Database("vanilla"),
    kaiserreich: new Database("kaiserreich"),
    millennium_dawn: new Database("millennium_dawn"),
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hearts of Iron IV - Division Designer</h1>
        </header>
        <Division dbs={this.dbs} />
      </div>
    );
  }
}

export default App;
