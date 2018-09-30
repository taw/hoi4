import React, { Component } from "react";

export default class SaveAndLoadDivision extends Component {
  state = {
    counter: 1,
    selection: 0,
  }
  loadClicked = () => {
    let saved = this.savedDivisions();
    let selected = saved[this.state.selection];
    this.props.onLoad(selected);
  }
  saveClicked = () => {
    let saved = this.savedDivisions();
    saved.push(this.props.saveData);
    window.localStorage.setItem("saved-hoi4-divisions", JSON.stringify(saved));
    // Force refresh
    this.setState({counter: this.state.counter + 1, selection: 0});
  }
  savedDivisions = () => {
    let saved = window.localStorage.getItem("saved-hoi4-divisions");
    if(!saved) {
      return [];
    } else {
      return JSON.parse(saved);
    }
  }
  changeSelection = (event) => {
    this.setState({selection: event.target.value});
  }
  render() {
    let saved = this.savedDivisions();
    let loadSelection, loadButton;
    if (saved.length >= 1) {
      loadSelection = <select value={this.state.selection} onChange={this.changeSelection}>
          { saved.map((division, key) => (
            <option key={key} value={key}>{ division.divisionName || `Division ${key+1}` }</option>
          )) }
        </select>
      loadButton = <button className="btn btn-primary" onClick={this.loadClicked}>Load division</button>
    }
    return (
      <div className="save-and-load-controls">
        <button className="btn btn-primary" onClick={this.saveClicked}>Save division</button>
        { loadSelection }
        { loadButton }
      </div>
    )
  }
}
