import React, { Component, Fragment } from "react";

export default class Doctrine extends Component {
  handleChange = (event) => {
    let value = event.target.value;
    this.props.changeDoctrine(value);
  }
  render() {
    let {db, doctrine} = this.props;
    return <Fragment>
      <h4>Doctrine</h4>
      <select value={doctrine || ""} onChange={this.handleChange}>
        <option value="" key="">-</option>
        {
          db.availableDoctrines().map(val => <option key={val} value={val}>{val}</option>)
        }
      </select>
    </Fragment>
  }
}

