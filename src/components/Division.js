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
      year: null,
      doctrine: null,
      units: [
        [7, "Infantry"],
        [2, "Artillery"],
        [0, ""],
      ],
      support: {
        "Logistics": true,
        "Rocket Artillery": true,
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

    return <div className="division-box">
      <Choices {...{db, country, year, doctrine, units, changeYear, changeDoctrine, changeUnits}} />
      <Support data={this.support()} onSupportChange={this.handleSupportChange} />
      <Basics data={this.basics()} />
      <Cost data={this.cost()}/>
      <Combat data={this.combat()}/>
      <Terrain data={this.terrain()}/>
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

  /* All these should be calculated obviously */
  support() {
    let { support } = this.state;
    return [
      {name: "Artillery", available: true, selected: !!(support["Artillery"])},
      {name: "Rocket Artillery", available: true, selected: !!(support["Rocket Artillery"])},
      {name: "Recon", available: true, selected: !!(support["Recon"])},
      {name: "Engineers", available: false, selected: !!(support["Engineers"])},
      {name: "Signal", available: false, selected: !!(support["Signal"])},
      {name: "Maintenance", available: true, selected: !!(support["Maintenance"])},
      {name: "Logistics", available: true, selected: !!(support["Logistics"])},
      {name: "MP", available: true, selected: !!(support["MP"])},
      {name: "Anti-Air", available: false, selected: !!(support["Anti-Air"])},
      {name: "Anti-Tank", available: true, selected: !!(support["Anti-Tank"])},
    ];
  }
  cost() {
    return [
      ["Manpower", "8600"],
      ["Training Time", "120 days"],
      ["Infantry Equipment II", 650],
      ["Artillery Equipment II", 84],
      ["Support Equipment", 40],
      ["Medium Tanks II", 50],
      ["IC Cost", 1536],
    ]
  }
  basics() {
    return [
      ["Speed", "4.0 km/h"],
      ["HP", "157.4"],
      ["Organization", "34.2"],
      ["Recovery rate", "0.25"],
      ["Suppression", "6.0"],
      ["Weight", "5.55"],
      ["Supply Use", "1.24"],
      ["Recon", "3"],
      ["Entrenchment", "7"],
    ]
  }
  combat() {
    return [
      ["Soft Attack", "194.8"],
      ["Hard Attack", "34.8"],
      ["Defense", "284.0"],
      ["Breakthrough", "104.8"],
      ["Armor", "28.7"],
      ["Piercing", "39.0"],
      ["Combat width", "20"],
      ["Hardness", "10 %"],
    ]
  }
  terrain() {
    return [
      ["Amphibious",     0,     8.3,     0.0],
      ["Forest",      -6.1,    -7.8,   +25.0],
      ["Fort",           0,    22.2,   +35.0],
      ["Hills",        8.9,    10.0,     0.0],
      ["Jungle",       1.1,   -10.0,   +25.0],
      ["Marsh",       22.2,    -5.6,   +25.0],
      ["Mountain",     5.6,    -2.2,     0.0],
      ["River",       28.3,    -6.7,   +25.0],
      ["Urban",          0,    -4.4,    -1.1],
      ["Desert",      10.0,     0.0,     0.0],
      ["Plains",      10.0,     0.0,     0.0],
    ]
  }
}
