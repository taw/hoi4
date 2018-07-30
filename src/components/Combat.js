import React, { Component } from 'react';

export default class Combat extends Component {
  render() {
    let { data, hasData } = this.props;
    if (!hasData) {
      return <div className="combat">
        <h4>Basics</h4>
        <div>Division has no units</div>
      </div>
    }

    return <div className="combat">
      <h4>Combat</h4>
      <ul>
        {
          data.map(([key, value]) => <li key={key}>
            <span>{key}</span>
            <span>{value}</span>
          </li>)
        }
      </ul>
    </div>
  }
}
