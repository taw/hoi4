import React, { Component } from 'react';

// FIXME: This id generation is pile of nonsense
export default class SupportEntry extends Component {
  handleChange = (event) => {
    let value = (event.target.value === "true");
    let {data, onSupportChange} = this.props;
    onSupportChange(data.name, value);
  }
  render() {
    let {data, index} = this.props;
    let {name, available, selected} = data;
    let id = `support-checkbox-${index}`;
    return <div>
      <input type="checkbox" id={id} checked={selected} disabled={!available} onChange={this.handleChange} />
      <label htmlFor={id}>{name}</label>
    </div>;
  }
}
