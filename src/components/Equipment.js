import React, { Component } from "react";
import AvailableUpgrades from "./AvailableUpgrades";

export default class EquipmentList extends Component {
  render() {
    let {equipment, count, cost} = this.props;
    console.log(equipment.key, equipment.availableUpgrades);


    return <li key={equipment.key}>
      <div className="equipment-count">
        <span>{equipment.name}</span>
        <span>{count} ({cost})</span>
      </div>
      { <AvailableUpgrades equipment={equipment} /> }
    </li>
  }
}

