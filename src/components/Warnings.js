import React, { Component, Fragment } from "react";

export default class Warnings extends Component {
  render() {
    let {warnings} = this.props;
    if (warnings.length === 0) {
      return null;
    }

    return <Fragment>
      <h4>Warnings</h4>
      {
        warnings.map((warning, index) => (
          <div key={index} className="alert alert-danger">{warning}</div>
        ))
      }
    </Fragment>
  }
}
