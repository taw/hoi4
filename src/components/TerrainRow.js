import React, { Component } from "react";
import TerrainCell from "./TerrainCell";

let capitalize = (name) => {
  return name.charAt(0).toUpperCase() + name.substr(1);
}

export default class TerrainRow extends Component {
  render() {
    let [name, mov, atk, def] = this.props.data;
    return <tr>
      <td>{capitalize(name)}</td>
      <TerrainCell data={mov} />
      <TerrainCell data={atk} />
      <TerrainCell data={def} />
    </tr>
  }
}
