import React, { Component } from 'react';
import TerrainCell from './TerrainCell';

export default class TerrainRow extends Component {
  render() {
    let [name, mov, atk, def] = this.props.data;
    return <tr>
      <td>{name}</td>
      <TerrainCell data={mov} />
      <TerrainCell data={atk} />
      <TerrainCell data={def} />
    </tr>
  }
}
