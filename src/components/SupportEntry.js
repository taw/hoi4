import React, { Component } from "react";

export default class SupportEntry extends Component {
  handleChange = (event) => {
    let value = event.target.checked;
    let {data, onSupportChange} = this.props;
    onSupportChange(data.key, value);
  }
  render() {
    let {data} = this.props;
    let {name, available, selected} = data;
    let shortName = name.replace(/^Support /, "").replace(/ Company$/, "");
    return <div className={available ? "checkbox" : "checkbox disabled"} >
      <label className="control-label">
        <input type="checkbox" checked={selected} disabled={!available} onChange={this.handleChange} />
        {shortName}
      </label>
    </div>;
  }
}
