import Unit from './Unit';
import Division from './Division';
import recursivelyMerge from './recursivelyMerge';

export default class Country {
  constructor(db, technologies) {
    this.db = db;
    this.technologies = technologies;
    this.equipmentMap = this.calculateEquipmentMap();
  }

  calculateEquipmentMap() {
    let result = {}
    // Making a silly assumption that they're sorted asciibetically
    // It seems to be right, as they're all X0, X1, X2 etc.
    for(let name of this.enabledEquipments()) {
      let equipment = this.db.equipment[name];
      let archetype = equipment.archetype;
      if(!result[archetype] || (equipment.key > result[archetype].key)) {
        result[archetype] = equipment;
      }
    }
    return result;
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
      if(!unitType) {
        throw new Error(`No such unit type: ${name}`)
      }
      let count = unitTypes[name];
      let unit = new Unit(unitType, this);
      for(let i=0; i<count; i++) {
        units.push(unit);
      }
    }
    return new Division(units);
  }

  unitBonusesFor(unitName) {
    let categories = [unitName, ...this.db.unitTypes[unitName].categories];
    let result = {};
    for(let technology of this.technologies) {
      for(let category of categories) {
        if(technology.unit_bonuses[category]) {
          recursivelyMerge(result, technology.unit_bonuses[category]);
        }
      }
    }
    return result;
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
