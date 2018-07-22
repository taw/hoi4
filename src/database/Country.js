import Unit from './Unit';
import Division from './Division';

export default class Country {
  constructor(db, technologies) {
    this.db = db;
    this.technologies = technologies;
  }

  availableUnits() {
    let {db} = this;
    let result = [];
    let enabledSubunits = this.enabledSubunits();
    let enabledEquipmentArchetypes = this.enabledEquipmentArchetypes();
    for(let name in db.unitTypes) {
      let unitType = db.unitTypes[name];
      if(unitType.active || enabledSubunits.has(name)) {
        let equipmentNeeded = Object.keys(unitType.equipment);
        if(equipmentNeeded.every(eq => enabledEquipmentArchetypes.has(eq))) {
          result.push(unitType);
        }
      }
    }
    return result;
  }

  division(unitTypes) {
    let {db} = this;
    let units = [];
    for(let name in unitTypes) {
      let unitType = db.unitTypes[name];
      let count = unitTypes[name];
      let unit = new Unit(unitType, this);
      for(let i=0; i<count; i++) {
        units.push(unit);
      }
    }
    return new Division(units);
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
