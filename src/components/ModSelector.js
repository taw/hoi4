import React, { Component } from "react";

export default class ModSelector extends Component {
  render() {
    let {changeMod} = this.props;
    return <div className="mod-selector">
      <span>Switch mod:</span>
      <button className="btn btn-primary" onClick={() => changeMod("vanilla")}>Vanilla (1.9.1)</button>
      <button className="btn btn-primary" onClick={() => changeMod("kaiserreich")}>Kaiserreich (0.9.3 for 1.7.1)</button>
      <button className="btn btn-primary" onClick={() => changeMod("millennium_dawn")}>Millennium Dawn (0.3.0 for 1.5.4)</button>
    </div>
  }
}
