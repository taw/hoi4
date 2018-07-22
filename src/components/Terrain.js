import React, { Component } from 'react';
import TerrainRow from './TerrainRow.js';

export default class Terrain extends Component {
  render() {
    let { data } = this.props;
    return <div className="terrain">
      <h4>Terrain</h4>
      <table>
        <tr>
          <th>Terrain</th>
          <th>Movement</th>
          <th>Attack</th>
          <th>Defense</th>
        </tr>
        {
          data.map(row => <TerrainRow data={row} />)
        }
      </table>
    </div>
  }
}
