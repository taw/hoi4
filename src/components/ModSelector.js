import React, { Component } from "react";

export default class ModSelector extends Component {
  render() {
    let {changeMod} = this.props;
    return <div className="mod-selector">
      <span>Switch mod:</span>
      <button className="btn btn-primary" onClick={() => changeMod("vanilla")}>Vanilla (1.9.1)</button>
      <button className="btn btn-primary" onClick={() => changeMod("kaiserreich")}>Kaiserreich (1.9.1)</button>
    </div>
  }
}
