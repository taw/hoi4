import Country from "./Country";
import Equipment from "./Equipment";
import vanilla from "./vanilla.json";
import kaiserreich from "./kaiserreich.json";
import road_to_56 from "./road_to_56.json";

let mods = {
  vanilla, kaiserreich, road_to_56
};

export default class Database {
  constructor(modName) {
    let mod = mods[modName];
    this.technology = mod.technology;
    this.doctrines = mod.doctrines;
    this.equipmentTypes = mod.equipment;
    this.unitTypes = mod.units;
    this.upgrades = mod.upgrades;
    this.default_year = mod.default_year;
    this.default_units = mod.default_units;
    this.default_support = mod.default_support;

    /* workarounds for limited collections API */
    for (let key in this.technology) {
      this.technology[key].key = key;
    }
    for (let key in this.equipmentTypes) {
      this.equipmentTypes[key].key = key;
    }
    for (let key in this.unitTypes) {
      this.unitTypes[key].key = key;
    }
    for (let key in this.upgrades) {
      this.upgrades[key].key = key;
    }
    this.fallbackEquipmentMap = this.calculateFallbackEquipmentMap();
  }

  availableYears() {
    let years = new Set();
    for (let tech of Object.values(this.technology)) {
      let year = tech.start_year;
      if (year) {
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
    if (!techs.length) {
      return ["infantry_weapons"];
    }
    return techs;
  }

  technologiesForDoctrine(doctrine) {
    return this.doctrines[doctrine] || [];
  }

  country(year, doctrine, upgrades) {
    let techs = [...this.technologiesForYear(year), ...this.technologiesForDoctrine(doctrine)];
    return new Country(this, techs.map(t => this.technology[t]), upgrades);
  }

  supportUnitTypes() {
    return Object.keys(this.unitTypes).filter((u) => this.unitTypes[u].group === "support");
  }

  // Using any of these results in invalid division, but it won't crash app
  // Pick oldest equipment for each archetype
  calculateFallbackEquipmentMap() {
    let result = {};
    for (let name in this.equipmentTypes) {
      let equipmentType = this.equipmentTypes[name];
      let archetype = equipmentType.archetype;
      if (!result[archetype] || (equipmentType.key < result[archetype].key)) {
        result[archetype] = equipmentType;
      }
      for (let name in result) {
        // FIXME: fallback equipment gets no variants, but they're still shown in UI
        result[name] = new Equipment(this, result[name], {});
      }
    }
    return result;
  }
}
