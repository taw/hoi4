import React, { Component } from "react";

export default class AvailableUpgrades extends Component {
  render() {
    let {equipment} = this.props;
    let availableUpgradeKeys = equipment.equipmentType.upgrades || [];
    if(!availableUpgradeKeys.length) {
      return null;
    }
    let db = equipment.db;
    let availableUpgrades = availableUpgradeKeys.map(n => db.upgrades[n]);

    return <div>
      {
        availableUpgrades.map((upgrade, index) => <div key={index} className="upgrade">
          {upgrade.name.replace(/ Armament/, "")}
          <input type="number" min={0} max={upgrade.max_level} defaultValue={0} disabled={true} />
        </div>)
      }
    </div>
  }
}
