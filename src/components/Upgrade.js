import React, { Component } from "react";

export default class Upgrade extends Component {
  handleChange = (event) => {
    let {upgrade, onChange} = this.props;
    let newValue = parseInt(event.target.value, 10);
    if (newValue < 0) {
      newValue = 0;
    }
    if (newValue > upgrade.max_level) {
      newValue = upgrade.max_level;
    }
    onChange(upgrade.key, newValue);
  }

  render() {
    let {upgrade, level} = this.props;
    let name = upgrade.name.replace(/ Armament/, "");

    return <div className="upgrade">
      {name}
      <input type="number" min={0} max={upgrade.max_level} value={level} onChange={this.handleChange}/>
    </div>
  }
}
