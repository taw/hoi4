import React, { Component } from "react";
import TerrainRow from "./TerrainRow";

export default class Terrain extends Component {
  render() {
    let { data } = this.props;
    if (data.length === 0) {
      return <div className="terrain">
        <h4>Terrain</h4>
        <div>Division has no terrain bonuses</div>
      </div>
    }

    return <div className="terrain">
      <h4>Terrain</h4>
      <table>
        <thead>
          <tr>
            <th>Terrain</th>
            <th>Movement</th>
            <th>Attack</th>
            <th>Defense</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((row, index) => <TerrainRow data={row} key={index}/>)
          }
        </tbody>
      </table>
    </div>
  }
}
