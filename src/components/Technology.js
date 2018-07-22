import React, { Component } from 'react';

// FIXME: Fragment ???
export default class Technology extends Component {
  handleChange = (event) => {
    let value = event.target.value;
    this.props.changeYear(value);
  }
  render() {
    let {db, year} = this.props;
    return <div>
      <h4>Technology</h4>
      <select value={year || ""} onChange={this.handleChange}>
        <option value="">-</option>
        {
          db.availableYears().map(val => <option value={val}>{val}</option>)
        }
      </select>
    </div>
  }
}
