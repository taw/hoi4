import React, { Component } from "react";

export default class StatTooltip extends Component {
  render() {
    let { data } = this.props;
    if (!data) {
      return null;
    }
    let { base, header, unitData, secondaryHeader, secondaryData, techHeader, techData } = data;
    return <div className="stat-tooltip">
      <div>{ header }</div>
      <table>
        <tbody>
          { (base != null) ?
            <tr key="base">
              <td className="substat-count"></td>
              <td className="substat-name">Base</td>
              <td className="substat-value">{base}</td>
            </tr>
            : null
          }
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
      { techHeader && <div>{ techHeader }</div> }
      { techData && <table>
        <tbody>
          { techData.map(({name, value}, index) => (
            <tr key={index}>
              <td className="substat-count"></td>
              <td className="substat-name">{name}</td>
              <td className="substat-value">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      }

    </div>
  }
}
