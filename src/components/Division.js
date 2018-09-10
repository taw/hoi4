import React, { Component } from "react";
import Basics from "./Basics";
import Choices from "./Choices";
import Combat from "./Combat";
import EquipmentList from "./EquipmentList";
import Support from "./Support";
import Terrain from "./Terrain";

export default class Division extends Component {
  constructor(props) {
    super(props);
    let {db} = props;
    this.state = {
      year: db.default_year,
      doctrine: null,
      units: db.default_units,
      support: db.default_support,
      upgrades: {},
      divisionName: "",
    }
  }
  componentWillReceiveProps(props) {
    let {db} = props;
    this.setState({
      year: db.default_year,
      doctrine: null,
      units: db.default_units,
      support: db.default_support,
      upgrades: {},
      divisionName: "",
    })
  }
  changeYear = (year) => {
    this.setState({year});
  }
  changeDoctrine = (doctrine) => {
    this.setState({doctrine});
  }
  changeUnits = (units) => {
    this.setState({units});
  }
  changeName = (divisionName) => {
    this.setState({divisionName});
  }
  changeUpgrade = (equipmentKey, upgradeKey, newLevel) => {
    this.setState(oldState => ({
      upgrades: {
        ...oldState.upgrades,
        [equipmentKey]: {
          ...(oldState.upgrades[equipmentKey] || {}),
          [upgradeKey]: newLevel,
        },
      }
    }));
  }
  render() {
    let {db} = this.props;
    let placeholderName = "My Division";
    let {year, doctrine, units, upgrades, divisionName} = this.state;
    let {changeYear, changeDoctrine, changeUnits, changeName} = this;
    let country = this.country();
    let division = this.division();
    let warnings = division.warnings();
    let hasData = (division.units.length !== 0);

    return <div className="division-box">
      <Choices {...{db, country, year, doctrine, units, changeYear, changeDoctrine, changeUnits, warnings, divisionName, placeholderName, changeName}} />
      <Support data={this.support()} onSupportChange={this.handleSupportChange} />
      <Basics data={division.basics()} hasData={hasData} />
      <EquipmentList data={division.equipmentUsed()} hasData={hasData} upgrades={upgrades} onUpgradeChange={this.changeUpgrade} />
      <Combat data={division.combat()}  hasData={hasData} />
      <Terrain data={division.terrain()}/>
    </div>
  }
  handleSupportChange = (company, state) => {
    let {support} = this.state;
    support = {...support, [company]: state};
    this.setState({support});
  }
  /* Not sure what should be the status of this */
  country() {
    let {db} = this.props;
    let {year, doctrine, upgrades} = this.state;
    return db.country(year, doctrine, upgrades);
  }
  division() {
    let {units, support} = this.state;
    let unitsTypes = {};
    let country = this.country();
    for(let [count, unitName] of units) {
      if(count) {
        unitsTypes[unitName] = (unitsTypes[unitName] || 0) + parseInt(count, 10);
      }
    }
    for(let supportName in support) {
      if(support[supportName]) {
        unitsTypes[supportName] = 1;
      }
    }
    return country.division(unitsTypes);
  }

  support() {
    let { db } = this.props;
    let { support } = this.state;
    let unitTypes = db.unitTypes;
    let supportUnitTypes = db.supportUnitTypes();
    let country = this.country();
    let available = country.availableUnits().map((unit) => unit.key);
    return supportUnitTypes.map((key) => ({
      key,
      name: unitTypes[key].name,
      available: (available.indexOf(key) !== -1),
      selected: !!(support[key]),
    }))
  }
}
