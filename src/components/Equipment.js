import React, { Component } from 'react';

export default class Equipment extends Component {
  render() {
    let {data, hasData} = this.props;
    if (!hasData) {
      return <div className="equipment">
        <h4>Equipment</h4>
        <div>Division has no units</div>
      </div>
    }

    return <div className="equipment">
      <h4>Equipment</h4>
      <ul>
      {
        data.map(([equipment, count, cost]) => <li key={equipment.key}>
          <span>{equipment.name}</span>
          <span>{count} ({cost})</span>
        </li>)
      }
      </ul>
    </div>
  }
}
