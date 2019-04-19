import React, { Component } from "react";

export default class ModSelector extends Component {
  render() {
    let {changeMod} = this.props;
    return <div className="mod-selector">
      <span>Switch mod:</span>
      <button className="btn btn-primary" onClick={() => changeMod("vanilla")}>Vanilla (1.6.2)</button>
      <button className="btn btn-primary" onClick={() => changeMod("kaiserreich")}>Kaiserreich (0.8.5 for 1.6.2)</button>
      <button className="btn btn-primary" onClick={() => changeMod("millennium_dawn")}>Millennium Dawn (0.3.0 for 1.5.4)</button>
    </div>
  }
}
