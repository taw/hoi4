// In principle other stats could get upgrades too
let upgradableStats = new Set([
  "air_agility",
  "air_attack",
  "air_bombing",
  "air_ground_attack",
  "air_range",
  "anti_air_attack",
  "ap_attack",
  "armor_value",
  "attack",
  "carrier_size",
  "evasion",
  "fire_range",
  "hard_attack",
  "maximum_speed",
  "naval_range",
  "naval_speed",
  "naval_strike_attack",
  "reliability",
  "shore_bombardment",
  "soft_attack",
  "sub_attack",
  "sub_detection",
  "sub_visibility",
  "torpedo_attack",
  // "reliability", - it's equipment-level not division-level, so doesn't fit the UI
  // R56
  "defense",
  "breakthrough",
]);

function round6(x) {
  return Math.round(x * 1000000) / 1000000;
}

export default class Equipment {
  constructor(db, equipmentType, upgrades) {
    this.db = db;
    this.equipmentType = equipmentType;
    this.upgrades = upgrades;
    let variantBonus = this.calculateVariantBonus();

    for (let key in this.equipmentType) {
      let base = this.equipmentType[key];
      if (upgradableStats.has(key)) {
        let bonus = variantBonus[key];
        if (bonus) {
          this[key] = round6(base * (1 + bonus));
        } else {
          this[key] = base;
        }
      } else {
        this[key] = base;
      }
    }
  }

  calculateVariantBonus() {
    let available_upgrades = this.equipmentType.upgrades || {};
    let result = {};
    for (let key in this.upgrades) {
      let level = this.upgrades[key];
      if (available_upgrades.indexOf(key) === -1) {
        throw new Error(`Invalid upgrade ${key} for equipment ${this.equipmentType.key}`);
      }
      let upgrade = this.db.upgrades[key];
      for (let stat in upgrade) {
        if (stat === "name" || stat === "max_level" || stat === "cost" || stat === "key") {
          continue;
        }
        let upgradeValue = upgrade[stat];
        result[stat] = result[stat] || 0;
        result[stat] = round6(result[stat] + level * upgradeValue);
      }
    }
    return result;
  }
}
