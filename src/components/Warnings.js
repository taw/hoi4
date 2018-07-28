import React, { Component, Fragment } from 'react';

export default class Warnings extends Component {
  render() {
    let {warnings} = this.props;
    if(warnings.length === 0) {
      return null;
    }

    return <Fragment>
      <h4>Warnings</h4>
      {
        warnings.map((w,i) => <div key={i} className="alert alert-danger">{w}</div>)
      }
    </Fragment>
  }
}
