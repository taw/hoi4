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
    if (!saved) {
      return [];
    } else {
      return JSON.parse(saved);
    }
  }
  copyToClipboard = () => {
    let data = btoa(JSON.stringify(this.props.saveData));
    window.history.pushState(null, null, "#" + data);
    let text = window.location.toString();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(function() {
        console.log('Async: Copying to clipboard was successful!');
      }, function(err) {
        console.error('Async: Could not copy text: ', err);
      });
    } else {
      console.error('Clipboard is unavailable');
    }
  }
  changeSelection = (event) => {
    this.setState({selection: event.target.value});
  }
  render() {
    let saved = this.savedDivisions();
    let loadSelection, loadButton, copyToClipboardButton;
    if (navigator.clipboard) {
      copyToClipboardButton = <button className="btn btn-primary" onClick={this.copyToClipboard}>Copy to Clipboard</button>
    }
    if (saved.length >= 1) {
      loadSelection = <select value={this.state.selection} onChange={this.changeSelection}>
        {
          saved.map((division, key) => (
            <option key={key} value={key}>{ division.divisionName || `Division ${key+1}` }</option>
          ))
        }
      </select>
      loadButton = <button className="btn btn-primary" onClick={this.loadClicked}>Load division</button>
    }
    return (
      <div className="save-and-load-controls">
        <button className="btn btn-primary" onClick={this.saveClicked}>Save division</button>
        { copyToClipboardButton }
        { loadSelection }
        { loadButton }
      </div>
    )
  }
}
