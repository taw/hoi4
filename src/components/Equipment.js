import React, { Component } from "react";

export default class EquipmentList extends Component {
  render() {
    let {equipment, count, cost} = this.props;
    return <li key={equipment.key}>
          <span>{equipment.name}</span>
          <span>{count} ({cost})</span>
        </li>
  }
}

