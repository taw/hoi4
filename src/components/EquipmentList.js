import React, { Component } from "react";
import Equipment from "./Equipment";

export default class EquipmentList extends Component {
  render() {
    let {data, hasData, upgrades, onUpgradeChange} = this.props;
    if (!hasData) {
      return <div className="equipment-list">
        <h4>Equipment</h4>
        <div>Division has no units</div>
      </div>
    }

    return <div className="equipment-list">
      <h4>Equipment</h4>
      <ul>
        {
          data.map(([equipment, count, cost]) =>
            <Equipment {...{equipment, count, cost, onUpgradeChange}} key={equipment.key} upgrades={upgrades[equipment.key] || {}} />
          )
        }
      </ul>
    </div>
  }
}
