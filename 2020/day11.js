const { loadData } = require('../../lib.js');
const data = loadData(__dirname, 'data.txt').map((v) => v.split(''));

const width = data[0].length;
const height = data.length;

const adjacent = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

const getSeat = (row, col, generation) => {
  return typeof generation[row] !== 'undefined' && typeof generation[row][col] !== 'undefined'
    ? generation[row][col]
    : null;
};

const occupiedNeighbours = (row, col, levels, threshold, generation) => {
  const neighbours = [null, null, null, null, null, null, null, null];
  let level = 1;

  while (neighbours.filter((v) => v === '#').length < threshold && level <= levels) {
    for (let i = 0; i < adjacent.length; i++) {
      if (neighbours[i] !== '#' && neighbours[i] !== 'L') {
        neighbours[i] = getSeat(
          row + adjacent[i][1] * level,
          col + adjacent[i][0] * level,
          generation
        );
      }
    }
    level += 1;
  }

  return neighbours.filter((v) => v === '#').length;
};

const nextGeneration = (generation, levels, threshold) => {
  // Deep cloning
  let next = JSON.parse(JSON.stringify(generation));

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const occupied = occupiedNeighbours(row, col, levels, threshold, generation);
      const val = generation[row][col];

      if (val === 'L' && occupied === 0) {
        next[row][col] = '#';
      } else if (val === '#' && occupied >= threshold) {
        next[row][col] = 'L';
      } else {
        next[row][col] = val;
      }
    }
  }

  if (generation.flat().join('') === next.flat().join('')) {
    return next.flat().filter((x) => x === '#').length;
  }

  return next;
};

const partOne = () => {
  let next = data;
  do {
    next = nextGeneration(next, 1, 4);
  } while (Array.isArray(next));

  return next;
};

const partTwo = () => {
  let next = data;
  do {
    next = nextGeneration(next, Math.max(width, height), 5);
  } while (Array.isArray(next));

  return next;
};

// console.clear();
// partOne()
console.log('Part one:', partOne());
console.log('Part two:', partTwo());

// Exports
exports.partOne = partOne;
exports.partTwo = partTwo;
