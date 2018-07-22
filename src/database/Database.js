import data from './data.json';
import Country from './Country';

// TODO: support multiple databases so it can work with mods etc.
export default class Database {
  constructor() {
    this.technology = data.technology;
    this.doctrines = data.doctrines;
    this.equipment = data.equipment;
    // this.units = data.units;
  }

  availableYears() {
    let years = new Set();
    for(let tech of Object.values(this.technology)) {
      let year = tech.start_year;
      if(year) {
        years.add(year);
      }
    }
    return [...years].sort();
  }

  availableDoctrines() {
    return Object.keys(this.doctrines);
  }

  technologiesForYear(year) {
    let techs = [];
    if (year) {
      for (let name in this.technology) {
        let tech = this.technology[name];
        if (tech.start_year && tech.start_year < year) {
          techs.push(name);
        }
      }
    }
    if(!techs.length) {
      return ["infantry_weapons"];
    }
    return techs;
  }

  technologiesForDoctrine(doctrine) {
    return this.doctrines[doctrine] || [];
  }

  country(year, doctrine) {
    let techs = [...this.technologiesForYear(year), ...this.technologiesForDoctrine(doctrine)];
    return new Country(this, techs.map(t => this.technology[t]));
  }
}
