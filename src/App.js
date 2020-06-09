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
    road_to_56: new Database("road_to_56"),
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hearts of Iron IV - Division Designer</h1>
        </header>
        <Division dbs={this.dbs} />
        <div className="footer-space"></div>
        <footer>
          If you have any feedback, <a href="mailto:Tomasz.Wegrzanowski@gmail.com">contact the author</a>, or <a href="https://github.com/taw/hoi4/issues">report an issue on github</a>.
        </footer>
      </div>
    );
  }
}

export default App;
