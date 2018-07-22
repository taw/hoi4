import React, { Component } from 'react';

export default class Unit extends Component {
  handleChangeCount = (event) => {
    let count = event.target.value;
    let {index, type, onChange} = this.props;
    onChange(index, [count, type]);
  }
  handleChangeType = (event) => {
    let type = event.target.value;
    let {index, count, onChange} = this.props;
    onChange(index, [count, type]);
  }
  render() {
    let {country, unit} = this.props;
    let [count, type] = unit;

    let availableFrontline = country.availableUnits().filter(u => u.combat_width > 0);

    return <div>
      <input type={count} value={count} onChange={this.handleChangeCount} />
      <select value={type} onChange={this.handleChangeType}>
        {
          availableFrontline.map(unit => <option value={unit.key}>{unit.name}</option> )
        }
      </select>
    </div>
  }
}
