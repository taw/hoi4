import React, { Component } from 'react';
import Basics from './Basics.js';
import Cost from './Cost.js';
import Combat from './Combat.js';
import Terrain from './Terrain.js';

export default class Division extends Component {
  render() {
    return <div className="division-box">
      {/* <Choices /> */}
      {/* <Support /> */}
      <Basics data={this.basics()} />
      <Cost data={this.cost()}/>
      <Combat data={this.combat()}/>
      <Terrain data={this.terrain()}/>
    </div>
  }

  /* All these should be calculated obviously */
  cost() {
    return [
      ["Manpower", "8600"],
      ["Training Time", "120 days"],
      ["Infantry Equipment II", 650],
      ["Artillery Equipment II", 84],
      ["Support Equipment", 40],
      ["Medium Tanks II", 50],
      ["IC Cost", 1536],
    ]
  }
  basics() {
    return [
      ["Speed", "4.0 km/h"],
      ["HP", "157.4"],
      ["Organization", "34.2"],
      ["Recovery rate", "0.25"],
      ["Suppression", "6.0"],
      ["Weight", "5.55"],
      ["Supply Use", "1.24"],
      ["Recon", "3"],
      ["Entrenchment", "7"],
    ]
  }
  combat() {
    return [
      ["Soft Attack", "194.8"],
      ["Hard Attack", "34.8"],
      ["Defense", "284.0"],
      ["Breakthrough", "104.8"],
      ["Armor", "28.7"],
      ["Piercing", "39.0"],
      ["Combat width", "20"],
      ["Hardness", "10 %"],
    ]
  }
  terrain() {
    return [
      ["Amphibious",     0,     8.3,     0.0],
      ["Forest",      -6.1,    -7.8,   +25.0],
      ["Fort",           0,    22.2,   +35.0],
      ["Hills",        8.9,    10.0,     0.0],
      ["Jungle",       1.1,   -10.0,   +25.0],
      ["Marsh",       22.2,    -5.6,   +25.0],
      ["Mountain",     5.6,    -2.2,     0.0],
      ["River",       28.3,    -6.7,   +25.0],
      ["Urban",          0,    -4.4,    -1.1],
      ["Desert",      10.0,     0.0,     0.0],
      ["Plains",      10.0,     0.0,     0.0],
    ]
  }
}
