import React, { Component } from 'react';

export default class Cost extends Component {
  render() {
    let {data} = this.props;
    return <div className="cost">
      <h4>Cost</h4>
      <ul>
      {
        data.map(([k,v]) => <li>
          <span>{k}</span>
          <span>{v}</span>
        </li>)
      }
      </ul>
    </div>
  }
}
