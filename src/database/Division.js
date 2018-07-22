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
      ["Speed", `${this.speed()} km/h`],
      ["HP", this.hp()],
      ["Organization", this.org()],
      ["Recovery rate", this.recovery_rate()],
      ["Suppression", this.suppression()],
      ["Weight", this.weight()],
      ["Supply Use", this.supply_use()],
      ["Recon", this.recon()],
      ["Entrenchment", this.entrenchment()],
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
      result.push([equipment.name, equipment.build_cost_ic * count]);
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
      ["Hardness", `${this.hardness()} %`],
    ])
  }

  terrain() {
    // FIXME
    return [
      ["Amphibious",     0,     8.3,     0.0],
      ["Forest",      -6.1,    -7.8,   +25.0],
      ["Fort",           0,    22.2,   +35.0],
      ["Hills",        8.9,    10.0,     0.0],
      ["Jungle",       1.1,   -10.0,   +25.0],
      ["Marsh",       22.2,    -5.6,   +25.0],
      ["Mountain",     5.6,    -2.2,     0.0],
      ["River",       28.3,    -6.7,   +25.0],
      ["Urban",          0,    -4.4,    -1.1],
      ["Desert",      10.0,     0.0,     0.0],
      ["Plains",      10.0,     0.0,     0.0],
    ]
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

  suppression() {
    return sum(this.units.map(u => u.suppression()))
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
    return min(this.frontline_units().map(u => u.speed()))
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
    return round6(avg(this.frontline_units().map(u => u.hardness())));
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
}
