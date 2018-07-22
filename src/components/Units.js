import React, { Component } from 'react';
import Unit from './Unit';

// FIXME: Fragment ???
export default class Units extends Component {
  render() {
    let {db, units} = this.props;
    return <div>
      <h4>Battalions</h4>
      {
        units.map((unit,i) => <Unit db={db} unit={unit} key={i}/>)
      }
    </div>
  }
}
