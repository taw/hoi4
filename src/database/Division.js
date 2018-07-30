import recursivelyMerge from './recursivelyMerge';
import {sprintf} from 'sprintf-js';

function sum(values) {
  let result = 0;
  for(let value of values) {
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
  if(values.length === 0) return;
  return sum(values) / values.length;
}

function round3(x) {
  return Math.round(x * 1000) / 1000;
}

function round6(x) {
  return Math.round(x * 1000000) / 1000000;
}

function cleanupReport(report) {
  report = report.filter(([k,v]) => (v !== 0));
  return report.map(([k,v]) => {
    if(typeof(v) === "number") {
      return [k,round6(v)];
    } else {
      return [k,v];
    }
  })
}

export default class Division {
  constructor(units) {
    this.units = units;
  }

  // Gather related numbers for frontend's convenience
  // This is sort of UI responsibility
  basics() {
    return cleanupReport([
      ["Speed", this.speed() ? `${this.speed()} km/h` : 0],
      ["HP", this.hp()],
      ["Organization", this.org()],
      ["Recovery rate", this.recovery_rate()],
      ["Suppression", this.suppression()],
      ["Weight", this.weight()],
      ["Supply Use", this.supply_use()],
      ["Recon", this.recon()],
      ["Entrenchment", this.entrenchment()],
      ["Reliability", this.reliability_factor()],
      ["Casualty trickleback", this.casualty_trickleback()],
      ["XP Loss", this.experience_loss_factor()],
      ["Can be parachuted", this.can_be_parachuted()],
      ["Special forces", this.special_forces()],
    ])
  }

  cost() {
    let result = [
      ["Manpower", this.manpower()],
      ["Training Time", `${this.training_time()} days`],
    ];
    for(let [equipment, count] of this.equipment()) {
      result.push([equipment.name, `${count} (${round6(equipment.build_cost_ic * count)})`]);
    }
    result.push(["IC Cost", this.ic_cost()]);
    return cleanupReport(result);
  }

  combat() {
    return cleanupReport([
      ["Soft Attack", this.soft_attack()],
      ["Hard Attack", this.hard_attack()],
      ["Defense", this.defense()],
      ["Breakthrough", this.breakthrough()],
      ["Armor", this.armor()],
      ["Piercing", this.piercing()],
      ["Combat width", this.combat_width()],
      ["Hardness", sprintf("%.1f %%", 100*this.hardness())],
      ["Initiative", this.initiative()],
      ["Equipment Capture", this.equipment_capture_factor()],
    ])
  }

  terrain() {
    let bonuses = this.terrain_bonuses();
    return Object.keys(bonuses).sort().map(name => {
      let bonus = bonuses[name];
      return [name, 100*(bonus.movement || 0), 100*(bonus.attack || 0), 100*(bonus.defence || 0)];
    })
  }

  // Individual numbers
  manpower() {
    return sum(this.units.map(u => u.manpower()))
  }

  training_time() {
    return max(this.units.map(u => u.training_time()))
  }

  combat_width() {
    return sum(this.units.map(u => u.combat_width()))
  }

  hp() {
    return sum(this.units.map(u => u.hp()))
  }

  org() {
    return round3(avg(this.units.map(u => u.org())))
  }

  weight() {
    return sum(this.units.map(u => u.weight()))
  }

  recovery_rate() {
    return round3(avg(this.units.map(u => u.recovery_rate())))
  }

  suppression() {
    let base = sum(this.units.map(u => u.suppression()))
    let factor = sum(this.units.map(u => u.suppression_factor()));
    return round6(base * (1+factor));
  }

  supply_use() {
    let base = sum(this.units.map(u => u.supply_use()));
    let factor = sum(this.units.map(u => u.supply_consumption_factor()));
    return round6(base * (1+factor));
  }

  soft_attack() {
    return round6(sum(this.units.map(u => u.soft_attack())))
  }

  hard_attack() {
    return round6(sum(this.units.map(u => u.hard_attack())))
  }

  air_attack() {
    return round6(sum(this.units.map(u => u.air_attack())))
  }

  defense() {
    return round6(sum(this.units.map(u => u.defense())))
  }

  breakthrough() {
    return round6(sum(this.units.map(u => u.breakthrough())))
  }

  ic_cost() {
    return sum(this.units.map(u => u.ic_cost()))
  }

  entrenchment() {
    return sum(this.units.map(u => u.entrenchment()))
  }

  reliability_factor() {
    return sum(this.units.map(u => u.reliability_factor()))
  }

  casualty_trickleback() {
    return sum(this.units.map(u => u.casualty_trickleback()))
  }

  equipment_capture_factor() {
    return sum(this.units.map(u => u.equipment_capture_factor()))
  }

  experience_loss_factor() {
    return sum(this.units.map(u => u.experience_loss_factor()))
  }

  recon() {
    return sum(this.units.map(u => u.recon()))
  }

  initiative() {
    return sum(this.units.map(u => u.initiative()))
  }

  frontline_units() {
    return this.units.filter(u => u.combat_width() > 0)
  }

  support_units() {
    return this.units.filter(u => !(u.combat_width() > 0))
  }

  speed() {
    let frontline_units = this.frontline_units();
    if (frontline_units.length === 0) {
      return;
    }
    return min(frontline_units.map(u => u.speed()))
  }

  armor() {
    let mx = max(this.units.map(u => u.armor()));
    let wa = avg(this.units.map(u => u.armor()));
    return round3(0.3 * mx + 0.7 * wa);
  }

  piercing() {
    let mx = max(this.units.map(u => u.piercing()));
    let wa = avg(this.units.map(u => u.piercing()));
    return round3(0.4 * mx + 0.6 * wa)
  }

  can_be_parachuted() {
    return this.units.every(u => u.can_be_parachuted()) ? "Yes" : "No"
  }

  special_forces() {
    return this.units.filter(u => u.special_forces()).length
  }

  hardness() {
    let frontline_units = this.frontline_units();
    if (frontline_units.length === 0) {
      return 0;
    }
    return round6(avg(frontline_units.map(u => u.hardness())));
  }

  equipment() {
    let result = new Map();
    for(let unit of this.units) {
      for(let [equipment, count] of unit.equipment) {
        let otherCount = result.get(equipment) || 0;
        result.set(equipment, count + otherCount);
      }
    }
    return result;
  }

  // average of frontlines + sum of supports
  terrain_bonuses() {
    let result = {};
    let frontline_units = this.frontline_units();
    for(let unit of frontline_units) {
      recursivelyMerge(result, unit.terrain_bonuses());
    }
    for(let terrain in result) {
      let bonus = result[terrain];
      for(let kind in bonus) {
        bonus[kind] /= frontline_units.length;
      }
    }
    for(let unit of this.support_units()) {
      recursivelyMerge(result, unit.terrain_bonuses());
    }
    return result;
  }

  missingEquipment() {
    let result = new Set();
    for(let unit of this.units) {
      unit.missingEquipment.forEach(eq => {
        result.add(eq)
      })
    }
    return result;
  }

  warnings() {
    let result = [];
    let frontline_units = this.frontline_units();
    let frontline_count = frontline_units.length;
    let support_count = this.support_units().length;
    let infantry = frontline_units.filter((u) => u.group() === "infantry").length;
    let mobile = frontline_units.filter((u) => u.group() === "mobile").length;
    let armored = frontline_units.filter((u) => u.group() === "armor").length;
    let brigades = Math.ceil(infantry/5) + Math.ceil(mobile/5) + Math.ceil(armored/5);
    let missingEquipment = this.missingEquipment();

    if(frontline_count === 0) {
      result.push("No frontline battalions");
    }
    if(frontline_count > 25) {
      result.push(`${frontline_count}/25 frontline battalions`);
    }
    else if(brigades > 5) {
      // No need to use this warning if there's just too many units
      result.push(`${brigades}/5 brigades`);
    }
    if(support_count > 5) {
      result.push(`${support_count}/5 support companies`);
    }
    for(let eq of missingEquipment) {
      result.push(`Missing equipment: ${eq}`);
    }
    return result;
  }
}
