import React, { Component } from "react";
import Upgrades from "./Upgrades";

export default class EquipmentList extends Component {
  render() {
    let {equipment, count, cost, upgrades, onUpgradeChange} = this.props;

    return <li key={equipment.key}>
      <div className="equipment-count">
        <span>{equipment.name}</span>
        <span>{count} ({cost})</span>
      </div>
      <Upgrades equipment={equipment} upgrades={upgrades} onChange={onUpgradeChange} />
    </li>
  }
}

