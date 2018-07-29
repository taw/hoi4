import React, { Component } from 'react';
import Basics from './Basics';
import Cost from './Cost';
import Combat from './Combat';
import Terrain from './Terrain';
import Support from './Support';
import Choices from './Choices';

export default class Division extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 1936,
      doctrine: null,
      units: [
        [7, "infantry"],
        [2, "artillery_brigade"],
        [0, "cavalry"],
      ],
      support: {
        "artillery": true,
      },
    }
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
  render() {
    let {db} = this.props;
    let {year, doctrine, units} = this.state;
    let {changeYear, changeDoctrine, changeUnits} = this;
    let country = this.country();
    let division = this.division();
    let warnings = division.warnings();

    return <div className="division-box">
      <Choices {...{db, country, year, doctrine, units, changeYear, changeDoctrine, changeUnits, warnings}} />
      <Support data={this.support()} onSupportChange={this.handleSupportChange} />
      <Basics data={division.basics()} />
      <Cost data={division.cost()}/>
      <Combat data={division.combat()}/>
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
    let {year, doctrine} = this.state;
    return db.country(year, doctrine);
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
    let available = country.availableUnits().map((u) => u.key);
    return supportUnitTypes.map((key) => ({
      key,
      name: unitTypes[key].name,
      available: (available.indexOf(key) !== -1),
      selected: !!(support[key]),
    }))
  }
}
