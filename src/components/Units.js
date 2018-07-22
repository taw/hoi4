import React, { Component, Fragment } from 'react';
import Unit from './Unit';

export default class Units extends Component {
  handleChange = (index, unit) => {
    let {changeUnits, units} = this.props;
    let newUnits = [...units];
    newUnits[index] = unit;
    changeUnits(newUnits);
  }

  render() {
    let {db, country, units} = this.props;
    return <Fragment>
      <h4>Battalions</h4>
      {
        units.map((unit,i) => <Unit {...{db, unit, country}} key={i} index={i} onChange={this.handleChange}/>)
      }
    </Fragment>
  }
}
