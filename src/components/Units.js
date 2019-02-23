import React, { Component, Fragment } from "react";
import Unit from "./Unit";

export default class Units extends Component {
  handleChange = (index, unit) => {
    let {changeUnits, units} = this.props;
    let newUnits = [...units];
    newUnits[index] = unit;

    // Try to maintain just one empty slot
    while (
      newUnits.length >= 2 &&
      newUnits[newUnits.length-1][0] === 0 &&
      newUnits[newUnits.length-2][0] === 0
    ) {
      newUnits.pop();
    }
    if (newUnits[newUnits.length-1][0] !== 0) {
      newUnits.push([0, "infantry"]);
    }
    changeUnits(newUnits);
  }

  render() {
    let {db, country, units} = this.props;
    return <Fragment>
      <h4>Battalions</h4>
      {
        units.map((unit, index) => (
          <Unit {...{db, unit, country}} key={index} index={index} onChange={this.handleChange} />
        ))
      }
    </Fragment>
  }
}
