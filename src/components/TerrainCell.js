import React, { Component } from "react";
import {sprintf} from "sprintf-js";
import StatTooltip from "./StatTooltip";

export default class TerrainCell extends Component {
  render() {
    let {value, tooltipData} = this.props.data;

    if (!tooltipData) {
      return <td></td>;
    }

    let className = (value >= 0) ? "bonus stat-value" : "penalty stat-value";
    let valuePretty = sprintf("%+.1f%%", value*100);

    return <td className="terrain-cell">
      <span className={className}>{valuePretty}</span>
      <StatTooltip data={tooltipData} />
    </td>
  }
}
