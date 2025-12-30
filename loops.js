"use strict";

function processData(data) {
  if (!Array.isArray(data)) {
    throw new TypeError("Expected an array");
  }

  const seen = new Set();
  let duplicateCount = 0;

  for (let i = 0; i < data.length; i++) {
    const value = data[i];

    if (seen.has(value)) {
      duplicateCount++;
    } else {
      seen.add(value);
    }
  }

  return duplicateCount;
}

try {
  const bigArray = Array.from({ length: 50000 }, () => "x");
  const result = processData(bigArray);
  console.log("Duplicate count:", result);
} catch (error) {
  console.error("Error processing data:", error.message);
}
