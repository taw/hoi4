import React, { Component } from "react";
import StatTooltip from "./StatTooltip";

export default class Stat extends Component {
  render() {
    let { name, value, tooltipData } = this.props;
    return <li className="stat">
      <span className="stat-name">{name}</span>
      <span className="stat-value">{value}</span>
      <StatTooltip data={tooltipData} />
    </li>
  }
}
