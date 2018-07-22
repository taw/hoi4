import React, { Component } from 'react';
import Technology from './Technology';
import Doctrine from './Doctrine';
import Units from './Units';

export default class Choices extends Component {
  render() {
    let {db, year, doctrine, units, changeYear, changeDoctrine, changeUnits} = this.props;
    return <div className="choices">
      <Technology {...{db, year, changeYear}} />
      <Doctrine {...{db, doctrine, changeDoctrine}} />
      <Units {...{db, units, changeUnits}} />
    </div>
  }
}
