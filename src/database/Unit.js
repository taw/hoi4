import recursivelyMerge from "./recursivelyMerge";

export default class Unit {
  constructor(unitType, country) {
    this.unitType = unitType;
    this.country = country;

    this.missingEquipment = new Set();
    this.equipment = new Map();
    for (let name in unitType.equipment) {
      let count = unitType.equipment[name];
      let equipment = country.equipmentMap[name];
      if (equipment) {
        this.equipment.set(equipment, count);
      } else {
        let fallbackEquipment = country.db.fallbackEquipmentMap[name];
        if (!fallbackEquipment) {
          throw new Error(`Can't find ${name}`);
        }
        this.equipment.set(fallbackEquipment, count);
        this.missingEquipment.add(fallbackEquipment.name);
      }
    }
    this.country_bonuses = country.unitBonusesfor(unitType.key);
  }

  get group() {
    return this.unitType.group;
  }

  get suppression() {
    return this.calculateFromUnitTypeAndBonus("suppression");
  }

  get suppression_factor() {
    return this.calculateFromUnitTypeAndBonus("suppression_factor");
  }

  get hp() {
    return this.unitType.hp;
  }

  get supply_use() {
    return this.unitType.supply_use;
  }

  get fuel_consumption() {
    let base = this.calculateFromEquipmentAndBonusMult("fuel_consumption");
    let factor = this.unitType.own_equipment_fuel_consumption_mult;
    if (factor == null) {
      factor = 1;
    }
    return base * factor;
  }

  get fuel_capacity() {
    return 28.8 * this.fuel_consumption;
  }

  get manpower() {
    return this.unitType.manpower;
  }

  get training_time() {
    return this.unitType.training_time;
  }

  get weight() {
    return this.unitType.weight;
  }

  get special_forces() {
    return this.unitType.special_forces;
  }

  get can_be_parachuted() {
    return this.unitType.can_be_parachuted;
  }

  get name() {
    return this.unitType.name;
  }

  get org() {
    let base = this.unitType.org;
    return base + (this.country_bonuses["max_organisation"] || 0)
  }

  get recovery_rate() {
    let base = this.unitType.recovery_rate;
    return base + (this.country_bonuses["default_morale"] || 0)
  }

  get reliability_factor() {
    return this.calculateFromUnitTypeAndBonus("reliability_factor");
  }

  get casualty_trickleback() {
    return this.calculateFromUnitTypeAndBonus("casualty_trickleback");
  }

  get experience_loss_factor() {
    return this.calculateFromUnitTypeAndBonus("experience_loss_factor");
  }

  get initiative() {
    return this.calculateFromUnitTypeAndBonus("initiative");
  }

  get equipment_capture_factor() {
    return this.calculateFromUnitTypeAndBonus("equipment_capture_factor")
  }

  get supply_consumption_factor() {
    return this.calculateFromUnitTypeAndBonus("supply_consumption_factor")
  }

  get fuel_consumption_factor() {
    return this.calculateFromUnitTypeAndBonus("fuel_consumption_factor")
  }

  get combat_width() {
    return this.calculateFromUnitTypeAndBonus("combat_width");
  }

  get is_frontline() {
    return this.combat_width > 0;
  }

  get is_speed_affecting() {
    return this.unitType.affects_speed !== false;
  }

  get recon() {
    return this.calculateFromUnitTypeAndBonus("recon")
  }

  get entrenchment() {
    return this.calculateFromUnitTypeAndBonus("entrenchment")
  }

  get soft_attack() {
    return this.calculateFromEquipmentAndBonusMult("soft_attack")
  }

  get hard_attack() {
    return this.calculateFromEquipmentAndBonusMult("hard_attack")
  }

  get air_attack() {
    return this.calculateFromEquipmentAndBonusMult("air_attack")
  }

  get defense() {
    return this.calculateFromEquipmentAndBonusMult("defense")
  }

  get breakthrough() {
    return this.calculateFromEquipmentAndBonusMult("breakthrough")
  }

  get piercing() {
    return this.calculateFromEquipmentAndBonusMult("ap_attack")
  }

  get armor() {
    // never any bonus, but doesn't hurt
    return this.calculateFromEquipmentAndBonusMult("armor_value")
  }

  get hardness() {
    return this.calculateFromEquipmentAndBonusMult("hardness")
  }

  calculateFromUnitTypeAndBonus(stat) {
    let base = this.unitType[stat] || 0;
    return base + (this.country_bonuses[stat] || 0)
  }

  calculateFromEquipmentAndBonus(stat) {
    let base = 0;
    for (let equipment of this.equipment.keys()) {
      base += equipment[stat];
    }
    return base + (this.country_bonuses[stat] || 0)
  }

  calculateFromEquipmentAndBonusMult(stat) {
    let base = 0;
    for (let equipment of this.equipment.keys()) {
      base += (equipment[stat] || 0);
    }

    return base * (1 + (this.unitType[stat] || 0) + (this.country_bonuses[stat] || 0))
  }

  get ic_cost() {
    let result = 0;
    for (let [equipment, count] of this.equipment) {
      result += equipment.build_cost_ic * count;
    }
    return result;
  }

  get speed() {
    // Unclear what to do when multiply types are used. Mot uses mot(12)+inf(4)
    let equipment = [...this.equipment.keys()]
    let equipmentSpeeds = equipment.map(e => e.maximum_speed).filter(s => s);
    let equipmentSpeed = equipmentSpeeds.length ? Math.max(...equipmentSpeeds) : 4.0;
    return equipmentSpeed * (1 + (this.unitType.maximum_speed || 0)) * (1 + (this.country_bonuses["maximum_speed"] || 0))
  }

  get terrain_bonuses() {
    let result = {};
    recursivelyMerge(result, this.unitType.terrain_bonuses);
    if (this.country_bonuses.terrain_bonuses) {
      recursivelyMerge(result, this.country_bonuses.terrain_bonuses);
    }
    return result;
  }
}
