export default class Country {
  constructor(db, technologies) {
    this.db = db;
    this.technologies = technologies;
  }

  availableUnits() {
    // FIXME: actually calculate
    return ["Infantry", "Artillery", "Medium Tanks"];
  }

  // PRIVATE
  enabledSubunits() {
    let {technologies} = this;
    let result = new Set();
    for(let tech of technologies) {
      for(let name of (tech.enable_subunits || [])) {
        result.add(name);
      }
    }
    return result;
  }

  enabledEquipments() {
    let {technologies} = this;
    let result = new Set();
    for(let tech of technologies) {
      for(let name of (tech.enable_equipments || [])) {
        result.add(name);
      }
    }
    return result;
  }

  enabledEquipmentArchetypes() {
    let {db} = this;
    let result = new Set();
    for(let eq of this.enabledEquipments()) {
      let archetype = db.equipment[eq].archetype;
      result.add(archetype);
    }
    return result;
  }
}
