let recursivelyMerge = (base, extra) => {
  for (let key in extra) {
    let val = extra[key];
    if (key in base) {
      if (typeof(val) === "object") {
        if (typeof(base[key]) !== "object") {
          throw new Error("Incompatible merge")
        }
        recursivelyMerge(base[key], val)
      } else if (typeof(val) === "number") {
        if (typeof(base[key]) !== "number") {
          throw new Error("Incompatible merge")
        }
        base[key] = base[key] + val;
      } else {
        throw new Error("Not sure how to merge")
      }
    } else {
      if (typeof(val) === "object") {
        base[key] = {};
        recursivelyMerge(base[key], val)
      } else if (typeof(val) === "number") {
        base[key] = val;
      } else {
        throw new Error("Not sure how to merge")
      }
    }
  }
}

export default recursivelyMerge;
