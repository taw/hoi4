export default class Country {
  constructor(db, technologies) {
    this.db = db;
    this.technologies = technologies;
  }

  availableUnits() {
    // raise "NOPE :-(";
    return ["Infantry", "Artillery", "Medium Tanks"];
  }
}
