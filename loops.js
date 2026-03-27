"use strict";

/**
 * Counts duplicates in an array.
 * - Skips sparse holes (doesn't treat missing entries as `undefined`)
 * - Logs real Error objects (keeps stack)
 * - Prevents unbounded memory/DoS by enforcing limits
 * - No top-level side effects (only runs when executed directly)
 *
 * Options:
 *  - maxLength: max allowed array length
 *  - maxUnique: max allowed unique values tracked
 *  - keyFn: optional function to normalize values for uniqueness
 */
function processData(data, options = {}) {
  const {
    maxLength = 200_000,
    maxUnique = 100_000,
    keyFn = null,
  } = options;

  if (!Array.isArray(data)) {
    throw new TypeError("Expected an array");
  }

  // Security: reject extremely large arrays up front
  if (data.length > maxLength) {
    throw new RangeError(
      `Array too large (${data.length}). Max allowed is ${maxLength}.`
    );
  }

  // Use Map so we can safely support key normalization if needed
  const seen = new Map();
  let duplicateCount = 0;

  for (let i = 0; i < data.length; i++) {
    // Bug fix: ignore sparse holes (missing indices)
    if (!(i in data)) continue;

    const value = data[i];

    // Bug/caveat fix: allow caller to define equality for objects if desired
    // Default behavior stays JS-native (reference equality for objects)
    const key = typeof keyFn === "function" ? keyFn(value) : value;

    if (seen.has(key)) {
      duplicateCount++;
    } else {
      // Security: avoid unbounded growth in unique tracking
      if (seen.size >= maxUnique) {
        throw new RangeError(
          `Too many unique values (${seen.size}). Max allowed is ${maxUnique}.`
        );
      }
      seen.set(key, true);
    }
  }

  return duplicateCount;
}

// Export for use as a module (no side effects on import)
module.exports = { processData };

/**
 * Only run demo when executed directly:
 * node loops.js
 */
if (require.main === module) {
  try {
    const bigArray = Array.from({ length: 50000 }, () => "x");
    const result = processData(bigArray);
    console.log("Duplicate count:", result);
  } catch (err) {
    // Bug fix: log the Error object, not just message (preserves stack)
    console.error(err);
  }
}
