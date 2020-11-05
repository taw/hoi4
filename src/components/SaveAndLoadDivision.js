import React, { Component } from "react";

export default class SaveAndLoadDivision extends Component {
  state = {
    counter: 1,
    selection: 0,
  }
  forceRefresh() {
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
  saveToLocalStorage(data) {
    window.localStorage.setItem("saved-hoi4-divisions", JSON.stringify(data));
    this.forceRefresh();
  }
  // Buttons
  loadDivision = () => {
    let saved = this.savedDivisions();
    let selected = saved[this.state.selection];
    this.props.onLoad(selected);
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
    this.setState({selection: parseInt(event.target.value)});
  }
  saveDivision = () => {
    let saved = this.savedDivisions();
    saved.push(this.props.saveData);
    this.saveToLocalStorage(saved);
  }
  deleteSelected = () => {
    let saved = this.savedDivisions();
    saved.splice(this.state.selection, 1);
    this.saveToLocalStorage(saved);
  }
  deleteAll = () => {
    this.saveToLocalStorage([]);
  }
  render() {
    let saved = this.savedDivisions();
    let loadSelection, loadButton, copyToClipboardButton, deleteSelectedButton, deleteAllButton;
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
      loadButton = <button className="btn btn-primary" onClick={this.loadDivision}>Load division</button>
      deleteSelectedButton = <button className="btn btn-danger" onClick={this.deleteSelected}>Delete Selected</button>
      deleteAllButton = <button className="btn btn-danger" onClick={this.deleteAll}>Delete All</button>
    }
    return (
      <div className="save-and-load-controls">
        <button className="btn btn-primary" onClick={this.saveDivision}>Save division</button>
        { copyToClipboardButton }
        { loadSelection }
        { loadButton }
        { deleteSelectedButton }
        { deleteAllButton }
      </div>
    )
  }
}
