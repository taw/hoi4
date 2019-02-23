import React, { Component } from "react";

export default class Unit extends Component {
  normalizeCount = (event) => {
    let {index, unit, onChange} = this.props;
    let [count, type] = unit;
    let normalizedCount = parseInt(count, 10);
    if (count !== normalizedCount) {
      onChange(index, [normalizedCount, type]);
    }
  }

  handleChangeCount = (event) => {
    let count = event.target.value;
    // A hack to convert once done, but still allow temporary bad values like ""
    if (count === ""+parseInt(count, 10)) {
      count = parseInt(count, 10);
    }
    let {index, unit, onChange} = this.props;
    let type = unit[1];
    onChange(index, [count, type]);
  }
  handleChangeType = (event) => {
    let type = event.target.value;
    let {index, unit, onChange} = this.props;
    let count = unit[0];
    onChange(index, [count, type]);
  }
  render() {
    let {country, unit} = this.props;
    let [count, type] = unit;

    let allFrontline = Object.values(country.db.unitTypes).filter(unit => unit.combat_width > 0);
    let availableFrontline = country.availableUnits().filter(unit => unit.combat_width > 0).map(unit => unit.key);

    return <div className="unit-select">
      <input type="number" min="0" value={""+count} onChange={this.handleChangeCount} onBlur={this.normalizeCount} />
      <select value={type} onChange={this.handleChangeType}>
        {
          allFrontline.map(unit => <option disabled={availableFrontline.indexOf(unit.key) === -1} key={unit.key} value={unit.key}>{unit.name}</option> )
        }
      </select>
    </div>
  }
}
