import React, { Component } from "react";
import Technology from "./Technology";
import Doctrine from "./Doctrine";
import Units from "./Units";
import Warnings from "./Warnings";

export default class Choices extends Component {
  render() {
    let {db, country, year, doctrine, units, warnings, changeYear, changeDoctrine, changeUnits} = this.props;
    return <div className="choices">
      <Technology {...{db, year, changeYear}} />
      <Doctrine {...{db, doctrine, changeDoctrine}} />
      <Units {...{db, country, units, changeUnits}} />
      <Warnings {...{warnings}} />
    </div>
  }
}
