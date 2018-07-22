import React, { Component } from 'react';

export default class Unit extends Component {
  render() {
    let {db, unit} = this.props;
    return <div>
      { JSON.stringify(unit) }
    </div>
  }
}

// %h4 Technology
// %select
//   %option 1941
// %h4 Doctrine
// %select
//   %option None


// %h4 Battalions
// %div
//   %input{type: "number", value: 6}
//   %select
//     %option{selected: true} Infantry
//     %option Artillery
//     %option Medium Tanks
