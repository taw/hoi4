import React, { Component } from 'react';

export default class Unit extends Component {
  handleChangeCount = (event) => {
    let count = event.target.value;
    let {index, type, onChange} = this.props;
    onChange(index, [count, type]);
  }
  handleChangeType = (event) => {
    let type = event.target.value;
    let {index, count, onChange} = this.props;
    onChange(index, [count, type]);
  }
  render() {
    let {db, unit} = this.props;
    let [count, type] = unit;
    return <div>
      <input type={count} value={count} onChange={this.handleChangeCount} />
      <select value={type} onChange={this.handleChangeType}>
        {
          db.availableUnits().map((name) => <option value={name}>{name}</option> )
        }
      </select>
    </div>
  }
}
