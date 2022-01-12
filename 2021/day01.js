const parse = (input) => {
  return input.split(/\r?\n/).map((line) => Number(line));
};

const countValues = (data, windowSize) => {
  let largerMeasurments = 0;

  for (let i = windowSize; i < data.length; i++) {
    if (data[i] > data[i - windowSize]) {
      largerMeasurments += 1;
    }
  }

  return largerMeasurments;
};

const partOne = (input) => {
  return countValues(parse(input), 1);
};

const partTwo = (input) => {
  return countValues(parse(input), 3);
};

exports.partOne = partOne;
exports.partTwo = partTwo;
