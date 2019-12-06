import React, { Component, Fragment } from "react";
import Basics from "./Basics";
import Choices from "./Choices";
import Combat from "./Combat";
import EquipmentList from "./EquipmentList";
import Support from "./Support";
import Terrain from "./Terrain";
import ModSelector from "./ModSelector";
import SaveAndLoadDivision from "./SaveAndLoadDivision";

export default class Division extends Component {
  constructor(props) {
    super(props);
    let {dbs} = props;
    this.dbs = dbs;
    let db = this.dbs.vanilla;

    let defaultState = {
      modName: "vanilla",
      year: db.default_year,
      doctrine: null,
      units: db.default_units,
      support: db.default_support,
      upgrades: {},
      divisionName: "",
    }

    if (window.location.hash) {
      try {
        console.log("PLEASE LOAD", window.location.hash)
        let dataFromHash = JSON.parse(atob(window.location.hash.substr(1)));
        defaultState = {...defaultState, ...dataFromHash};
      } catch(err) {
        console.log("Couldn't load division from hash")
      }
    }

    this.state = defaultState;
  }
  get db() {
    return this.dbs[this.state.modName];
  }
  changeMod = (modName) => {
    let db = this.dbs[modName];
    this.setState({
      modName: modName,
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
      },
    }));
  }
  handleLoad = (savedData) => {
    this.setState(savedData);
  }
  render() {
    let db = this.db;
    let placeholderName = "My Division";
    let {year, doctrine, units, upgrades, divisionName} = this.state;
    let {changeYear, changeDoctrine, changeUnits, changeName} = this;
    let country = this.country();
    let division = this.division();
    let warnings = division.warnings();
    let hasData = (division.units.length !== 0);

    return <Fragment>
      <div className="division-box">
        <Choices {...{db, country, year, doctrine, units, changeYear, changeDoctrine, changeUnits, warnings, divisionName, placeholderName, changeName}} />
        <Support data={this.support()} onSupportChange={this.handleSupportChange} />
        <Basics data={division.basics()} hasData={hasData} />
        <EquipmentList data={division.equipmentUsed()} hasData={hasData} upgrades={upgrades} onUpgradeChange={this.changeUpgrade} />
        <Combat data={division.combat()}  hasData={hasData} />
        <Terrain data={division.terrain()}/>
      </div>
      <ModSelector changeMod={this.changeMod} />
      <SaveAndLoadDivision onLoad={this.handleLoad} saveData={this.state} />
    </Fragment>
  }
  handleSupportChange = (company, state) => {
    let {support} = this.state;
    support = {...support, [company]: state};
    this.setState({support});
  }
  country() {
    let {year, doctrine, upgrades} = this.state;
    let db = this.db;
    return db.country(year, doctrine, upgrades);
  }
  division() {
    let {units, support} = this.state;
    let unitsTypes = {};
    let country = this.country();
    for (let [count, unitName] of units) {
      if (count) {
        unitsTypes[unitName] = (unitsTypes[unitName] || 0) + parseInt(count, 10);
      }
    }
    for (let supportName in support) {
      if (support[supportName]) {
        unitsTypes[supportName] = 1;
      }
    }
    return country.division(unitsTypes);
  }

  support() {
    let db = this.db;
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
