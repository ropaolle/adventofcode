const { loadData } = require('../../lib.js');

const data = loadData(__dirname, 'data.txt', { numeric: true, sorted: true });

const partOne = () => {
  // const isAllUnique = data.length - new Set(data).size === 0;
  // const max = data[data.length - 1] + 3;
  let pointer = 0;
  let ones = 0;
  let threes = 0;
  for (let index = 0; index < data.length; index++) {
    const diff = data[index] - pointer;
    switch (diff) {
      case 1:
        ones += 1;
        break;
      case 3:
        threes += 1;
    }
    pointer = data[index];
    // console.log('ones, threes', ones, threes, index);
  }
  return ones * (threes + 1);
};

const partTwo = () => {
  const map = new Map([[0, 1]]);
  for (let i = 0; i < data.length; i++) {
    const ways =
    (map.get(data[i] - 1) || 0) +
    (map.get(data[i] - 2) || 0) +
    (map.get(data[i] - 3) || 0);
    map.set(data[i], ways);
  }
  return map.get(data.pop());
};

// console.clear();
// console.log('Part one:', partOne());
console.log('Part two:', partTwo());

// Exports
exports.partOne = partOne;
exports.partTwo = partTwo;
