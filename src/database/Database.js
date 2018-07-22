import data from './data.json';
import Country from './Country';

// TODO: support multiple databases so it can work with mods etc.
export default class Database {
  availableYears() {
    let years = new Set();
    for(let tech of Object.values(data.technology)) {
      let year = tech.start_year;
      if(year) {
        years.add(year);
      }
    }
    return [...years].sort();
  }

  availableDoctrines() {
    return Object.keys(data.doctrines);
  }

  technologiesForYear(year) {
    let techs = [];
    if (year) {
      for (let name in data.technology) {
        let tech = data.technology[name];
        if (tech.start_year && tech.start_year < year) {
          techs.push(name);
        }
      }
    }
    return techs;
  }

  technologiesForDoctrine(doctrine) {
    return data.doctrines[doctrine] || [];
  }

  country(year, doctrine) {
    let techs = [...this.technologiesForYear(year), this.technologiesForDoctrine(doctrine)];
    return new Country(this, techs);
  }
}
