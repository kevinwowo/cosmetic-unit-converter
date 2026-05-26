// Cosmetic unit converter — pure logic, reusable in a webpage,
// a Chrome/Edge/Firefox extension, a WordPress plugin or an npm package.
// No dependencies, no DOM access.

(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.CosmeticConverter = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  // Volume units expressed in milliliters.
  var VOLUME = {
    ml: 1,
    cc: 1,
    l: 1000,
    floz_us: 29.5735,
    tsp_us: 4.92892,
    tbsp_us: 14.78676,
  };

  // Mass units expressed in grams.
  var MASS = {
    g: 1,
    oz_wt: 28.3495,
  };

  // Convert an amount to every supported unit.
  // density is in g/ml (defaults to 1.0, water-like).
  // Returns an object keyed by unit code.
  function convert(value, fromUnit, density) {
    var v = parseFloat(value);
    var d = parseFloat(density);
    if (!isFinite(v)) v = 0;
    if (!isFinite(d) || d <= 0) d = 1;

    // Resolve everything to milliliters first.
    var ml;
    if (VOLUME.hasOwnProperty(fromUnit)) {
      ml = v * VOLUME[fromUnit];
    } else if (MASS.hasOwnProperty(fromUnit)) {
      var grams = v * MASS[fromUnit];
      ml = grams / d;
    } else {
      throw new Error("Unknown unit: " + fromUnit);
    }

    var out = {};
    for (var u in VOLUME) out[u] = ml / VOLUME[u];
    var totalGrams = ml * d;
    for (var m in MASS) out[m] = totalGrams / MASS[m];
    return out;
  }

  return { convert: convert, VOLUME: VOLUME, MASS: MASS };
});
