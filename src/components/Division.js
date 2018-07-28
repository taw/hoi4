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
        unitsTypes[unitName] = count;
      }
    }
    for(let supportName in support) {
      if(support[supportName]) {
        unitsTypes[supportName] = 1;
      }
    }
    return country.division(unitsTypes);
  }

  /* All these should be calculated obviously */
  support() {
    // FIXME
    let { support } = this.state;
    return [
      {key: "artillery", name: "Artillery", available: true, selected: !!(support["artillery"])},
      {key: "rocket_artillery", name: "Rocket Artillery", available: true, selected: !!(support["rocket_artillery"])},
      {key: "recon", name: "Recon", available: true, selected: !!(support["recon"])},
      {key: "engineers", name: "Engineers", available: false, selected: !!(support["engineers"])},
      {key: "signal", name: "Signal", available: false, selected: !!(support["signal"])},
      {key: "maintenance", name: "Maintenance", available: true, selected: !!(support["maintenance"])},
      {key: "logistics_company", name: "Logistics", available: true, selected: !!(support["logistics_company"])},
      {key: "mp", name: "MP", available: true, selected: !!(support["mp"])},
      {key: "anti-air", name: "Anti-Air", available: false, selected: !!(support["anti-air"])},
      {key: "anti-tank", name: "Anti-Tank", available: true, selected: !!(support["anti-tank"])},
    ];
  }
}
