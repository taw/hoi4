import React, { Component } from 'react';

export default class Basics extends Component {
  render() {
    let { data } = this.props;
    return <div className="basics">
      <h4>Basics</h4>
      <ul>
        {
          data.map(([k, v]) => <li key={k}>
            <span>{k}</span>
            <span>{v}</span>
          </li>)
        }
      </ul>
    </div>
  }
}
