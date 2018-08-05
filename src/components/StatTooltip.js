import React, { Component } from "react";

export default class StatTooltip extends Component {
  render() {
    let { data } = this.props;
    if(!data) {
       return null;
    }
    let { header, unitData, secondaryHeader, secondaryData } = data;
    return <div className="stat-tooltip">
      <span>{ header }</span>
      <table>
        <tbody>
          { unitData.map(({unit, count, value}, index) => (
            <tr key={index}>
              <td>{count}x</td>
              <td>{unit.name()}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      { secondaryHeader && <span>{ secondaryHeader }</span> }
      { secondaryData && <table>
        <tbody>
          { secondaryData.map(({unit, count, value}, index) => (
            <tr key={index}>
              <td>{count}x</td>
              <td>{unit.name()}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    }

    </div>
  }
}
