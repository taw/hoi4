import React, { Component } from "react";
import Upgrade from "./Upgrade";

export default class Upgrades extends Component {
  handleChange = (upgradeKey, newValue) => {
    let {equipment,onChange} = this.props;
    onChange(equipment.key, upgradeKey, newValue);
  }

  render() {
    let {equipment,upgrades} = this.props;
    let availableUpgradeKeys = equipment.equipmentType.upgrades || [];
    if (!availableUpgradeKeys.length) {
      return null;
    }
    let db = equipment.db;
    let availableUpgrades = availableUpgradeKeys.map(n => db.upgrades[n]);

    return <div>
      {
        availableUpgrades.map(upgrade => (
          <Upgrade key={upgrade.key} upgrade={upgrade} level={upgrades[upgrade.key] || 0} onChange={this.handleChange} />
        ))
      }
    </div>
  }
}
