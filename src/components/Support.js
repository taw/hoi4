import React, { Component } from 'react';
import SupportEntry from './SupportEntry';

export default class Support extends Component {
  render() {
    let {data, onSupportChange} = this.props;
    return <div className="support">
      <h4>Support</h4>
      <div className="list">
        {
          data.map((row,i) =>
            <SupportEntry key={i} data={row} onSupportChange={onSupportChange} />
          )
        }
      </div>
    </div>;
  }
}
