import React, { Component } from 'react';

export default class Combat extends Component {
  render() {
    let { data } = this.props;
    return <div className="combat">
      <h4>Combat</h4>
      <ul>
        {
          data.map(([k, v]) => <li>
            <span>{k}</span>
            <span>{v}</span>
          </li>)
        }
      </ul>
    </div>
  }
}
