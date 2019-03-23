import Unit from "./Unit";
import Division from "./Division";
import Equipment from "./Equipment";
import recursivelyMerge from "./recursivelyMerge";

export default class Country {
  constructor(db, technologies, upgrades) {
    this.db = db;
    this.technologies = technologies;
    this.upgrades = upgrades;
    this.equipmentMap = this.calculateEquipmentMap();
    this.divisionBonuses = this.calculateDivisionBonuses();
  }

  calculateEquipmentMap() {
    let result = {}
    // Making a silly assumption that they're sorted asciibetically
    // It seems to be right, as they're all X0, X1, X2 etc.
    for (let name of this.enabledEquipmentTypes()) {
      let equipment = this.db.equipmentTypes[name];
      let archetype = equipment.archetype;
      if (!result[archetype] || (equipment.key > result[archetype].key)) {
        result[archetype] = equipment;
      }
    }
    for (let name in result) {
      let equipmentType = result[name];
      let upgrades = this.upgrades[equipmentType.key] || {};
      result[name] = new Equipment(this.db, equipmentType, upgrades);
    }
    return result;
  }

  availableUnits() {
    let {db} = this;
    let result = [];
    let enabledSubunits = this.enabledSubunits();
    let enabledEquipmentArchetypes = this.enabledEquipmentArchetypes();
    for (let name in db.unitTypes) {
      let unitType = db.unitTypes[name];
      if (unitType.active || enabledSubunits.has(name)) {
        let equipmentNeeded = Object.keys(unitType.equipment);
        if (equipmentNeeded.every(eq => enabledEquipmentArchetypes.has(eq))) {
          result.push(unitType);
        }
      }
    }
    return result;
  }

  division(unitTypes) {
    let {db} = this;
    let units = [];
    for (let name in unitTypes) {
      let unitType = db.unitTypes[name];
      if (!unitType) {
        throw new Error(`No such unit type: ${name}`)
      }
      let count = unitTypes[name];
      let unit = new Unit(unitType, this);
      for (let i=0; i<count; i++) {
        units.push(unit);
      }
    }
    return new Division(this, units);
  }

  unitBonusesfor (unitName) {
    let categories = [unitName, ...this.db.unitTypes[unitName].categories];
    let result = {};
    for (let technology of this.technologies) {
      for (let category of categories) {
        if (technology.unit_bonuses[category]) {
          recursivelyMerge(result, technology.unit_bonuses[category]);
        }
      }
    }
    return result;
  }

  calculateDivisionBonuses() {
    let result = {
      max_dig_in: 0,
      supply_consumption_factor: 0,
      army_speed_factor: 0,
    };
    for(let tech of this.technologies) {
      result.max_dig_in += (tech.max_dig_in || 0);
      result.supply_consumption_factor += (tech.supply_consumption_factor || 0);
      result.army_speed_factor += (tech.army_speed_factor || 0);
    }
    return result;
  }

  enabledSubunits() {
    let {technologies} = this;
    let result = new Set();
    for (let tech of technologies) {
      for (let name of (tech.enable_subunits || [])) {
        result.add(name);
      }
    }
    return result;
  }

  enabledEquipmentTypes() {
    let {technologies} = this;
    let result = new Set();
    for (let tech of technologies) {
      for (let name of (tech.enable_equipments || [])) {
        result.add(name);
      }
    }
    return result;
  }

  enabledEquipmentArchetypes() {
    let {db} = this;
    let result = new Set();
    for (let eq of this.enabledEquipmentTypes()) {
      let archetype = db.equipmentTypes[eq].archetype;
      result.add(archetype);
    }
    return result;
  }
}
