function processData(data) {
  if (!Array.isArray(data)) {
    throw new TypeError("Expected an array");
  }

  const seen = new Set();
  let duplicateCount = 0;

  for (let i = 0; i < data.length; i++) {
    if (seen.has(data[i])) {
      duplicateCount++;
    } else {
      seen.add(data[i]);
    }
  }

  return duplicateCount;
}

const bigArray = new Array(50000).fill("x");
processData(bigArray);
