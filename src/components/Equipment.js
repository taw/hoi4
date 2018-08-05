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
        data.map(([key, value, cost]) => <li key={key}>
          <span>{key}</span>
          <span>{value} ({cost})</span>
        </li>)
      }
      </ul>
    </div>
  }
}
