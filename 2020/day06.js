const { loadData } = require('../../lib.js');

const data = loadData(__dirname, 'data.txt').reduce(
  (acc, line) => {
    if (line.trim().length > 0) {
      acc[acc.length - 1].push(line);
    } else {
      acc.push([]);
    }
    return acc;
  },
  [[]]
);

const chrCount = (val) =>
  val.reduce((acc, v) => {
    const chrs = v.split('');
    chrs.forEach((chr) => {
      if (!(chr in acc)) {
        acc[chr] = 1;
      } else {
        acc[chr] += 1;
      }
    });
    return acc;
  }, {});

const partOne = () =>
  data
    .map((v) => (v.length === 1 ? v[0].length : Object.keys(chrCount(v)).length))
    .reduce((acc, v) => acc + v, 0);

const partTwo = () =>
  data
    .map((v) =>
      v.length === 1
        ? v[0].length
        : Object.values(chrCount(v)).filter((v2) => v2 === v.length).length
    )
    .reduce((acc, v) => acc + v, 0);

// console.clear();
// console.log('Part one:', partOne());
// console.log('Part two:', partTwo());

// Exports
exports.partOne = partOne;
exports.partTwo = partTwo;
