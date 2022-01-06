const { loadData, numSort } = require('../../lib.js');
const data = loadData(__dirname, 'data.txt');

const ids = () =>
  data.map(
    (line) =>
      parseInt(line.substring(0, 7).replace(/F/g, '0').replace(/B/g, '1'), 2) * 8 +
      parseInt(line.substring(7, 10).replace(/L/g, '0').replace(/R/g, '1'), 2)
  );

const partOne = () => ids(data).reduce((acc, v) => Math.max(acc, v), 0);

const partTwo = () => {
  const sortedIds = ids(data).sort(numSort);
  for (let i = 0; i < sortedIds.length - 1; i++) {
    if (sortedIds[i + 1] - sortedIds[i] > 1) {
      return sortedIds[i + 1] - 1;
    }
  }
};

// console.clear();
// console.log('Part one:', partOne());
// console.log('Part two:', partTwo());

// Exports
exports.partOne = partOne;
exports.partTwo = partTwo;
