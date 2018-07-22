import React, { Component } from 'react';
import {sprintf} from 'sprintf-js';

export default class TerrainCell extends Component {
  render() {
    let {data} = this.props;
    if (data === 0)
      return <td></td>;

    let className = (data > 0) ? "bonus" : "penalty";

    let dataPretty = sprintf("%.1f%%", data);

    return <td className={className}>{dataPretty}</td>
  }
}
