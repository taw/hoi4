import React, { Component } from "react";
import DivisionName from "./DivisionName";
import Doctrine from "./Doctrine";
import Technology from "./Technology";
import Units from "./Units";
import Warnings from "./Warnings";

export default class Choices extends Component {
  render() {
    let {db, country, year, doctrine, units, warnings, changeYear, changeDoctrine, changeUnits, divisionName, placeholderName, changeName} = this.props;
    return <div className="choices">
      <DivisionName {...{divisionName, placeholderName, changeName}} />
      <Technology {...{db, year, changeYear}} />
      <Doctrine {...{db, doctrine, changeDoctrine}} />
      <Units {...{db, country, units, changeUnits}} />
      <Warnings {...{warnings}} />
    </div>
  }
}
