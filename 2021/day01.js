function parse(input) {
  return input.split(/\r?\n/).map((line) => Number(line));
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

exports.partOne = function partOne(input) {
  return countValues(parse(input), 1);
};

exports.partTwo = function partTwo(input) {
  return countValues(parse(input), 3);
};
