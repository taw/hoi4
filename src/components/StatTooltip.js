import React, { Component } from "react";

export default class StatTooltip extends Component {
  render() {
    let { data } = this.props;
    if(!data) {
       return null;
    }
    let { header, unitData, secondaryHeader, secondaryData } = data;
    return <div className="stat-tooltip">
      <div>{ header }</div>
      <table>
        <tbody>
          { unitData.map(({unit, count, value}, index) => (
            <tr key={index}>
              <td className="substat-count">{count}x</td>
              <td className="substat-name">{unit.name}</td>
              <td className="substat-value">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      { secondaryHeader && <div>{ secondaryHeader }</div> }
      { secondaryData && <table>
        <tbody>
          { secondaryData.map(({unit, count, value}, index) => (
            <tr key={index}>
              <td className="substat-count">{count}x</td>
              <td className="substat-name">{unit.name}</td>
              <td className="substat-value">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    }

    </div>
  }
}
