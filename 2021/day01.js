const testInput = `
199
200
208
210
200
207
240
269
260
263
`;

function parse(input) {
  return input
    .split(/\r?\n/)
    .filter((line) => line.length !== 0) // Ignore empty lines in the test input
    .map((line) => Number(line));
}

function countValues(data, windowSize) {
  let largerMeasurments = 0;

  for (let i = windowSize; i < data.length; i++) {
    if (data[i] > data[i - windowSize]) {
      largerMeasurments += 1;
    }
  }

  return largerMeasurments;
}

function partOne(input) {
  return countValues(parse(input), 1);
}

function partTwo(input) {
  return countValues(parse(input), 3);
}

/* c8 ignore next 4 */
if (process.env.ROPAOLLE === 'DEV') {
  console.info(`${__filename} - Part one:`, partOne(testInput));
  console.info(`${__filename} - Part two:`, partTwo(testInput));
}

exports.partOne = partOne;
exports.partTwo = partTwo;
