import {sprintf} from "sprintf-js";

function sum(values) {
  let result = 0;
  for (let value of values) {
    result += value;
  }
  return result;
}

function max(values) {
  return Math.max(...values);
}

function min(values) {
  return Math.min(...values);
}

function avg(values) {
  if (values.length === 0) return;
  return sum(values) / values.length;
}

function round3(x) {
  return Math.round(x * 1000) / 1000;
}

function round6(x) {
  return Math.round(x * 1000000) / 1000000;
}

function cleanupReport(report) {
  report = report.filter(([k,v,t]) => (v !== 0));
  return report.map(([k,v,t]) => {
    if (typeof(v) === "number") {
      return [k,round6(v),t];
    } else {
      return [k,v,t];
    }
  })
}

function formatSpeed(value) {
  if (!value) {
    return 0;
  }
  return sprintf("%.1f km/h", value);
}

export default class Division {
  constructor(country, units) {
    this.country = country;
    this.units = units;
  }

  // Gather related numbers for frontend"s convenience
  // This is sort of UI responsibility
  basics() {
    return cleanupReport([
      ["Speed", formatSpeed(this.speed), this.tooltipForSpeed()],
      ["HP", this.hp, this.tooltipForSum("hp")],
      ["Organization", this.org, this.tooltipForOrganization()],
      ["Recovery rate", this.recovery_rate, this.tooltipForRecoveryRate()],
      ["Suppression", this.suppression, this.tooltipForSuppression()],
      ["Weight", this.weight, this.tooltipForSum("weight")],
      ["Supply Use", this.supply_use, this.tooltipForSupplyUse()],
      ["Fuel Use", this.fuel_use, this.tooltipForFuelUse()],
      ["Fuel Capacity", this.fuel_capacity, this.tooltipForSum("fuel_capacity")],
      ["Recon", this.recon, this.tooltipForSum("recon")],
      ["Entrenchment", this.entrenchment, this.tooltipForEntrenchment()],
      ["Reliability", this.reliability_factor, this.tooltipForSum("reliability_factor")],
      ["Casualty trickleback", this.casualty_trickleback, this.tooltipForSum("casualty_trickleback")],
      ["XP Loss", this.experience_loss_factor, this.tooltipForSum("experience_loss_factor")],
      ["Can be parachuted", this.can_be_parachuted, this.tooltipForCanBeParachuted()],
      ["Special forces", this.special_forces, this.tooltipForSpecialForces()],
      ["Manpower", this.manpower, this.tooltipForSum("manpower")],
      ["Training Time", `${this.training_time} days`, this.tooltipForTrainingTime()],
      ["IC Cost", this.ic_cost, this.tooltipForSum("ic_cost")],
    ])
  }

  equipmentUsed() {
    let result = [];
    for (let [equipment, count] of this.equipment) {
      if (count > 0) {
        result.push([equipment, count, round6(equipment.build_cost_ic * count)]);
      }
    }
    return result;
  }

  combat() {
    return cleanupReport([
      ["Soft Attack", this.soft_attack, this.tooltipForSum("soft_attack")],
      ["Hard Attack", this.hard_attack, this.tooltipForSum("hard_attack")],
      ["Air Attack", this.air_attack, this.tooltipForSum("air_attack")],
      ["Defense", this.defense, this.tooltipForSum("defense")],
      ["Breakthrough", this.breakthrough, this.tooltipForSum("breakthrough")],
      ["Armor", this.armor, this.tooltipForArmor()],
      ["Piercing", this.piercing, this.tooltipForPiercing()],
      ["Combat width", this.combat_width, this.tooltipForSum("combat_width")],
      ["Hardness", sprintf("%.1f %%", 100*this.hardness), this.tooltipForHardness()],
      ["Initiative", this.initiative, this.tooltipForSum("initiative")],
      ["Equipment Capture", this.equipment_capture_factor, this.tooltipForSum("equipment_capture_factor")],
    ])
  }

  terrain() {
    let bonuses = this.terrain_bonuses;
    return Object.keys(bonuses).sort().map(name => {
      let bonus = bonuses[name];
      return [name, bonus.movement, bonus.attack, bonus.defence];
    })
  }

  // Individual numbers
  get manpower() {
    return sum(this.units.map(u => u.manpower))
  }

  get training_time() {
    return max(this.units.map(u => u.training_time))
  }

  get combat_width() {
    return sum(this.units.map(u => u.combat_width))
  }

  get hp() {
    return sum(this.units.map(u => u.hp))
  }

  get org() {
    return round3(avg(this.units.map(u => u.org)))
  }

  get weight() {
    return sum(this.units.map(u => u.weight))
  }

  get recovery_rate() {
    return round3(avg(this.units.map(u => u.recovery_rate)))
  }

  get suppression() {
    let base = sum(this.units.map(u => u.suppression));
    let factor = sum(this.units.map(u => u.suppression_factor));
    return round6(base * (1+factor));
  }

  get supply_use() {
    let base = sum(this.units.map(u => u.supply_use));
    let unit_factor = sum(this.units.map(u => u.supply_consumption_factor));
    let doctrine_factor = this.country.divisionBonuses["supply_consumption_factor"] || 0;
    return round6(base * (1+unit_factor) * (1+doctrine_factor));
  }

  get fuel_use() {
    let base = sum(this.units.map(u => u.fuel_consumption));
    let factor = sum(this.units.map(u => u.fuel_consumption_factor));
    return round6(base * (1+factor));
  }

  get fuel_capacity() {
    // It's 28.8 times fuel use - without discounts
    let base = sum(this.units.map(u => u.fuel_consumption));
    let factor = 28.8;
    return round6(base * factor);
  }

  get soft_attack() {
    return round6(sum(this.units.map(u => u.soft_attack)))
  }

  get hard_attack() {
    return round6(sum(this.units.map(u => u.hard_attack)))
  }

  get air_attack() {
    return round6(sum(this.units.map(u => u.air_attack)))
  }

  get defense() {
    return round6(sum(this.units.map(u => u.defense)))
  }

  get breakthrough() {
    return round6(sum(this.units.map(u => u.breakthrough)))
  }

  get ic_cost() {
    return sum(this.units.map(u => u.ic_cost))
  }

  get entrenchment() {
    let base = 5;
    let units = sum(this.units.map(u => u.entrenchment))
    let doctrine_bonus = this.country.divisionBonuses["max_dig_in"];
    return base + units + doctrine_bonus;
  }

  get reliability_factor() {
    return sum(this.units.map(u => u.reliability_factor))
  }

  get casualty_trickleback() {
    return sum(this.units.map(u => u.casualty_trickleback))
  }

  get equipment_capture_factor() {
    return sum(this.units.map(u => u.equipment_capture_factor))
  }

  get experience_loss_factor() {
    return sum(this.units.map(u => u.experience_loss_factor))
  }

  get recon() {
    return sum(this.units.map(u => u.recon))
  }

  get initiative() {
    return sum(this.units.map(u => u.initiative))
  }

  get frontline_units() {
    return this.units.filter(u => u.is_frontline)
  }

  get support_units() {
    return this.units.filter(u => !u.is_frontline)
  }

  get speed_affecting_units() {
    return this.units.filter((u) => u.is_speed_affecting)
  }

  get speed() {
    let speed_affecting_units = this.speed_affecting_units;
    if (speed_affecting_units.length === 0) {
      return null;
    }
    let base = min(speed_affecting_units.map(u => u.speed));
    let factor = this.country.divisionBonuses["army_speed_factor"] || 0;
    return round3(base * (1 + factor));
  }

  get armor() {
    let mx = max(this.units.map(u => u.armor));
    let wa = avg(this.units.map(u => u.armor));
    return round3(0.3 * mx + 0.7 * wa);
  }

  get piercing() {
    let mx = max(this.units.map(u => u.piercing));
    let wa = avg(this.units.map(u => u.piercing));
    return round3(0.4 * mx + 0.6 * wa)
  }

  get can_be_parachuted() {
    return this.units.every(u => u.can_be_parachuted) ? "Yes" : "No"
  }

  get special_forces() {
    return this.units.filter(u => u.special_forces).length
  }

  get hardness() {
    let unit_hardness = this.frontline_units.map(u => u.hardness);
    if (unit_hardness.length === 0) {
      return 0;
    }
    return round6(avg(unit_hardness));
  }

  get equipment() {
    let result = new Map();
    for (let unit of this.units) {
      for (let [equipment, count] of unit.equipment) {
        let otherCount = result.get(equipment) || 0;
        result.set(equipment, count + otherCount);
      }
    }
    return result;
  }

  // average of frontlines + sum of supports
  terrainBonusfor (terrain, bonus) {
    let values = this.groupUnitStats(unit => (unit.terrain_bonuses[terrain] || {})[bonus] || 0);
    let frontlineValues = values.filter(({unit}) => unit.is_frontline);
    let supportValues = values.filter(({unit}) => !unit.is_frontline)
    let baseValue = frontlineValues.map(({count, value}) => count*value).reduce((a,b) => a+b, 0.0);
    let bonusValue = supportValues.map(({value}) => value).reduce((a,b) => a+b, 0.0);

    let value = baseValue / this.frontline_units.length + bonusValue;

    // If there are all 0s, don't show anything
    // Otherwise show 0.0% with tooltip if calculations add up to 0.0%
    if (values.every(({value}) => value === 0)) {
      return { value: 0 };
    }

    let format = (value) => {
      return sprintf("%+.1f%%", value * 100);
    }

    let unitData = frontlineValues.map(({unit,count,value}) => ({unit,count,value:format(value)}));
    let secondaryData = supportValues.filter(({value}) => value !== 0).map(({unit,count,value}) => ({unit,count,value:format(value)}));

    let tooltipData = {
      header: "Average of frontline units:",
      unitData,
    };
    if (secondaryData.length > 0) {
      tooltipData.secondaryHeader = "Modified by support units:";
      tooltipData.secondaryData = secondaryData;
    }
    return { value, tooltipData };
  }

  get terrain_bonuses() {
    let terrains = new Set();
    for (let unit of this.units) {
      for (let terrain of Object.keys(unit.terrain_bonuses)) {
        terrains.add(terrain);
      }
    }
    let result = {};
    for (let terrain of terrains) {
      result[terrain] = {
        movement: this.terrainBonusfor (terrain, "movement"),
        attack: this.terrainBonusfor (terrain, "attack"),
        defence: this.terrainBonusfor (terrain, "defence"),
      };
    }
    return result;
  }

  missingEquipment() {
    let result = new Set();
    for (let unit of this.units) {
      unit.missingEquipment.forEach(eq => {
        result.add(eq)
      })
    }
    return result;
  }

  // These are sort of UI maters:
  warnings() {
    let result = [];
    let frontline_units = this.frontline_units;
    let frontline_count = frontline_units.length;
    let support_count = this.support_units.length;
    let infantry = frontline_units.filter((u) => u.group === "infantry").length;
    let mobile = frontline_units.filter((u) => u.group === "mobile").length;
    let armored = frontline_units.filter((u) => u.group === "armor").length;
    let brigades = Math.ceil(infantry/5) + Math.ceil(mobile/5) + Math.ceil(armored/5);
    let missingEquipment = this.missingEquipment();

    if (frontline_count === 0) {
      result.push("No frontline battalions");
    }
    if (frontline_count > 25) {
      result.push(`${frontline_count}/25 frontline battalions`);
    }
    else if (brigades > 5) {
      // No need to use this warning if there"s just too many units
      result.push(`${brigades}/5 brigades`);
    }
    if (support_count > 5) {
      result.push(`${support_count}/5 support companies`);
    }
    for (let eq of missingEquipment) {
      result.push(`Missing equipment: ${eq}`);
    }
    return result;
  }

  groupUnitStats(field) {
    let unitData = new Map();
    for (let unit of this.units) {
      let value;
      if (typeof field === "string") {
        value = unit[field];
      } else {
        value = field(unit);
      }
      if (typeof(value) === "number") {
        value = round6(value);
      }
      if (unitData.has(unit)) {
        let count = unitData.get(unit).count + 1;
        unitData.set(unit, {unit, count, value});
      } else {
        let count = 1;
        unitData.set(unit, {unit, count, value});
      }
    }
    return [...unitData.values()]
  }

  groupFrontlineUnitStats(field) {
    return this.groupUnitStats(field).filter(({unit}) => unit.is_frontline)
  }

  groupSpeedAffectingUnitStats(field) {
    return this.groupUnitStats(field).filter(({unit}) => unit.is_speed_affecting)
  }

  tooltipForSum(field) {
    return ({
      header: "Sum of:",
      unitData: this.groupUnitStats(field).filter(({value}) => value !== 0),
    })
  }

  tooltipForEntrenchment() {
    let result = {
      header: "Sum of:",
      base: 5,
      unitData: this.groupUnitStats("entrenchment").filter(({value}) => value !== 0),
    };
    let factor = this.country.divisionBonuses["max_dig_in"];
    if (factor !== 0) {
      result.techHeader = "Modified by doctrine:"
      result.techData = this.techBonusesFor("max_dig_in")
    }
    return result;
  }

  tooltipForArmor() {
    return ({
      header: "30% max / 70% average of:",
      unitData: this.groupUnitStats("armor"),
    })
  }

  tooltipForPiercing() {
    return ({
      header: "40% max / 60% average of:",
      unitData: this.groupUnitStats("piercing"),
    })
  }

  tooltipForSuppression() {
    let result = {
      header: "Sum of:",
      unitData: this.groupUnitStats("suppression").filter(({value}) => value !== 0),
    }
    let secondaryData = this.groupUnitStats("suppression_factor").filter(({value}) => value !== 0);
    if (secondaryData.length > 0) {
      result.secondaryHeader = "Modified by:"
      result.secondaryData = secondaryData.map(({unit,count,value}) => ({unit, count, value: sprintf("%+f%%", 100*value)}));
    }
    return result;
  }

  tooltipForSupplyUse() {
    let result = {
      header: "Sum of:",
      unitData: this.groupUnitStats("supply_use").filter(({value}) => value !== 0),
    };
    let secondaryData = this.groupUnitStats("supply_consumption_factor").filter(({value}) => value !== 0);
    if (secondaryData.length > 0) {
      result.secondaryHeader = "Modified by:"
      result.secondaryData = secondaryData.map(({unit,count,value}) => ({unit, count, value: sprintf("%+f%%", 100*value)}));
    }
    let factor = this.country.divisionBonuses["supply_consumption_factor"];
    if (factor !== 0) {
      result.techHeader = "Modified by doctrine:"
      result.techData = this
        .techBonusesFor("supply_consumption_factor")
        .map(({name, value}) => ({name, value: sprintf("%+f%%", 100*value)}))
    }
    return result;
  }

  tooltipForFuelUse() {
    let result = {
      header: "Sum of:",
      unitData: this.groupUnitStats("fuel_consumption").filter(({value}) => value !== 0),
    };
    let secondaryData = this.groupUnitStats("fuel_consumption_factor").filter(({value}) => value !== 0);
    if (secondaryData.length > 0) {
      result.secondaryHeader = "Modified by:"
      result.secondaryData = secondaryData.map(({unit,count,value}) => ({unit, count, value: sprintf("%+f%%", 100*value)}));
    }
    return result;
  }

  techBonusesFor(field) {
    return this
      .country
      .technologies
      .map(tech => ({name: tech.name, value: tech[field]}))
      .filter(({value}) => (value||0) !== 0)
  }

  tooltipForSpeed() {
    let result = {
      header: "Minimum of speed affecting units:",
      unitData: this.groupSpeedAffectingUnitStats("speed").map(({unit,count,value}) => ({unit, count, value: formatSpeed(value)})),
    };
    let factor = this.country.divisionBonuses["army_speed_factor"];
    if (factor !== 0) {
      result.techHeader = "Modified by doctrine:"
      result.techData = this
        .techBonusesFor("army_speed_factor")
        .map(({name, value}) => ({name, value: sprintf("%+f%%", 100*value)}))
    }
    return result;
  }

  tooltipForOrganization() {
    return ({
      header: "Average of:",
      unitData: this.groupFrontlineUnitStats("org"),
    })
  }

  tooltipForRecoveryRate() {
    return ({
      header: "Average of:",
      unitData: this.groupFrontlineUnitStats("recovery_rate"),
    })
  }

  tooltipForHardness() {
    return ({
      header: "Average of frontline units:",
      unitData: this.groupFrontlineUnitStats("hardness").map(({unit,count,value}) => ({unit, count, value: sprintf("%.1f %%", 100*value)})),
    })
  }

  tooltipForCanBeParachuted() {
    return ({
      header: "If all frontline units can:",
      unitData: this.groupFrontlineUnitStats("can_be_parachuted").map(({unit,count,value}) => ({unit, count, value: value ? "Yes" : "No"})),
    })
  }

  tooltipForSpecialForces() {
    return ({
      header: "Count of:",
      unitData: this.groupFrontlineUnitStats("special_forces")
        .filter(({value}) => value)
        .map(({unit,count,value}) => ({unit, count, value: "Yes"})),
    })
  }

  tooltipForTrainingTime() {
    return ({
      header: "Max of:",
      unitData: this.groupUnitStats("training_time").map(({unit,count,value}) => ({unit, count, value: `${value} days`})),
    })
  }
}
