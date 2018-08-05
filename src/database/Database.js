import Country from "./Country";
import vanilla from "./vanilla.json";
import kaiserreich from "./kaiserreich.json";
import millennium_dawn from "./millennium_dawn.json";

let mods = {
  vanilla, kaiserreich, millennium_dawn
};

export default class Database {
  constructor(modName) {
    let mod = mods[modName];
    this.technology = mod.technology;
    this.doctrines = mod.doctrines;
    this.equipment = mod.equipment;
    this.unitTypes = mod.units;
    this.default_year = mod.default_year;
    this.default_units = mod.default_units;
    this.default_support = mod.default_support;

    /* workarounds for limited collections API */
    for(let key in this.technology) {
      this.technology[key].key = key;
    }
    for(let key in this.equipment) {
      this.equipment[key].key = key;
    }
    for(let key in this.unitTypes) {
      this.unitTypes[key].key = key;
    }
    this.fallbackEquipmentMap = this.calculateFallbackEquipmentMap();
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
        if (tech.start_year && tech.start_year <= year) {
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

  supportUnitTypes() {
    return Object.keys(this.unitTypes).filter((u) => this.unitTypes[u].group === "support");
  }

  // Using any of these results in invalid division, but it won't crash app
  // Pick oldest equipment for eacsh archetype
  calculateFallbackEquipmentMap() {
    let result = {};
    for(let name in this.equipment) {
      let equipment = this.equipment[name];
      let archetype = equipment.archetype;
      if(!result[archetype] || (equipment.key < result[archetype].key)) {
        result[archetype] = equipment;
      }
    }
    return result;
  }
}
