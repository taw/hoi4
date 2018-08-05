import React, { Component } from 'react';
import StatTooltip from './StatTooltip';

export default class Combat extends Component {
  render() {
    let { data, hasData } = this.props;
    if (!hasData) {
      return <div className="combat">
        <h4>Basics</h4>
        <div>Division has no units</div>
      </div>
    }

    return <div className="combat">
      <h4>Combat</h4>
      <ul>
        {
          data.map(([key, value, tooltipData]) => <li key={key} className="stat-tooltip-container">
            <span>{key}</span>
            <span>{value}</span>
            <StatTooltip data={tooltipData} />
          </li>)
        }
      </ul>
    </div>
  }
}
