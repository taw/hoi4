import data from './data.json';

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

  availableUnits() {
    return ["Infantry", "Artillery", "Medium Tanks"];
  }
}
