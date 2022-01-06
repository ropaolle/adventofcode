const { loadData } = require('../../lib.js');

const data = loadData(__dirname, 'data.txt').map((v) => Number(v));

const sumExist = (val, arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === val) {
        return true;
      }
    }
  }
  return false;
};

const partOne = () => {
  const preambleSize = 25;
  let window = data.slice(0, preambleSize);

  for (let i = preambleSize; i < data.length - preambleSize; i++) {
    const val = data[i];
    const exists = sumExist(val, window);
    if (!exists) {
      console.log(exists, i, val, window, val, data[i - 1]);
      return val;
    }
    window.shift();
    window.push(val);
  }
};

const partTwo = () => {
  const test = 177777905; //127;

  for (let i = 0; i < data.length; i++) {
    let j = i;
    let sum = 0;
    let list = [];
    let min = test;
    let max = 0;

    while (sum < test) {
      j += 1;
      const val = data[j];
      list.push(val);
      min = Math.min(min, val);
      max = Math.max(max, val);
      sum += val;
    }
    if (sum === test) {
      // console.log('sum, min, max', sum, min, max);
      return min + max;
    }
  }
};

// console.clear();
// console.log('Part one:', partOne());
// console.log('Part two:', partTwo());

// Exports
exports.partOne = partOne;
exports.partTwo = partTwo;
