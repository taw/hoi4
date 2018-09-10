import React, { Component } from "react";

export default class Choices extends Component {
  render() {
    let { divisionName, placeholderName, changeName } = this.props;
    return <div>
      <h4>Name</h4>
      <input type="text" value={divisionName} placeholder={placeholderName} onChange={(e) => changeName(e.target.value)}/>
    </div>
  }
}
