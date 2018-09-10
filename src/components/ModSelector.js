import React, { Component } from "react";

export default class ModSelector extends Component {
  render() {
    let {changeMod} = this.props;
    return <div className="mod-selector">
      <span>Switch mod:</span>
      <button className="btn btn-primary" onClick={() => changeMod("vanilla")}>Vanilla</button>
      <button className="btn btn-primary" onClick={() => changeMod("kaiserreich")}>Kaiserreich</button>
      <button className="btn btn-primary" onClick={() => changeMod("millennium_dawn")}>Millennium Dawn</button>
    </div>
  }
}
