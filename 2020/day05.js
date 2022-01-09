const { numericSort } = require('../lib/extras.js');

const parse = (input) => input.split(/\r?\n/);

const ids = (data) =>
  data.map(
    (line) =>
      parseInt(line.substring(0, 7).replace(/F/g, '0').replace(/B/g, '1'), 2) * 8 +
      parseInt(line.substring(7, 10).replace(/L/g, '0').replace(/R/g, '1'), 2)
  );

const partOne = (input) => ids(parse(input)).reduce((acc, v) => Math.max(acc, v), 0);

const partTwo = (input) => {
  const data = parse(input);

  const sortedIds = ids(data).sort(numericSort);
  for (let i = 0; i < sortedIds.length - 1; i++) {
    if (sortedIds[i + 1] - sortedIds[i] > 1) {
      return sortedIds[i + 1] - 1;
    }
  }
};

exports.partOne = partOne;
exports.partTwo = partTwo;
