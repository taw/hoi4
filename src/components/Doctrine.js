import React, { Component } from 'react';

// FIXME: Fragment ???
export default class Doctrine extends Component {
  handleChange = (event) => {
    let value = event.target.value;
    this.props.changeDoctrine(value);
  }
  render() {
    let {db, doctrine} = this.props;
    return <div>
      <h4>Doctrine</h4>
      <select value={doctrine || ""} onChange={this.handleChange}>
        <option value="">-</option>
        {
          db.availableDoctrines().map(val => <option value={val}>{val}</option>)
        }
      </select>
    </div>
  }
}

