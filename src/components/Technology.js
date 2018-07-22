import React, { Component, Fragment } from 'react';

export default class Technology extends Component {
  handleChange = (event) => {
    let value = event.target.value;
    this.props.changeYear(value);
  }
  render() {
    let {db, year} = this.props;
    return <Fragment>
      <h4>Technology</h4>
      <select value={year || ""} onChange={this.handleChange}>
        <option value="">-</option>
        {
          db.availableYears().map(val => <option value={val}>{val}</option>)
        }
      </select>
    </Fragment>
  }
}
