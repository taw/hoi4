import React, { Component } from 'react';

export default class SupportEntry extends Component {
  constructor(props) {
    super(props);
    // Not the best code ever
    this.id = `support-checkbox-${Math.random()}`;
  }
  handleChange = (event) => {
    let value = event.target.checked;
    let {data, onSupportChange} = this.props;
    onSupportChange(data.key, value);
  }
  render() {
    let {data} = this.props;
    let {name, available, selected} = data;
    return <div className={available ? "checkbox" : "checkbox disabled"} >
      <input type="checkbox" id={this.id} checked={selected} disabled={!available} onChange={this.handleChange} />
      <label className="control-label" htmlFor={this.id}>{name}</label>
    </div>;
  }
}
