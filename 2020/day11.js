const parse = (input) => {
  const lines = input.split(/\r?\n/);
  return lines.map((v) => v.split(''));
};

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

const clone2DArray = (arr) => {
  // return JSON.parse(JSON.stringify(arr));
  return arr.map((row) => [...row]);
};

const getSeat = (row, col, generation) => {
  return typeof generation[row] !== 'undefined' && typeof generation[row][col] !== 'undefined'
    ? generation[row][col]
    : null;
};

// eslint-disable-next-line complexity
const occupiedNeighbours = (row, col, levels, threshold, generation) => {
  const neighbours = [null, null, null, null, null, null, null, null];
  let level = 1;
  let hit = 0;

  while (level <= levels) {
    for (let i = 0; i < adjacent.length; i++) {
      if (neighbours[i] !== '#' && neighbours[i] !== 'L') {
        const n = getSeat(row + adjacent[i][1] * level, col + adjacent[i][0] * level, generation);

        if (n === '#' && neighbours[i] !== '#') {
          hit += 1;
        }

        neighbours[i] = n;
      }
      if (hit >= threshold) {
        break;
      }
    }
    level += 1;
  }

  return neighbours.filter((v) => v === '#').length;
};

// eslint-disable-next-line complexity
const nextGeneration = (generation, threshold, closestNeighbours) => {
  let next = clone2DArray(generation);
  const maxCols = generation[0].length;
  const maxRows = generation.length;

  let changed = false;
  for (let row = 0; row < maxRows; row++) {
    for (let col = 0; col < maxCols; col++) {
      const levels = closestNeighbours ? 1 : Math.max(maxCols - col, maxRows - row, col, row);
      const occupied = occupiedNeighbours(row, col, levels, threshold, generation);
      const val = generation[row][col];

      if (val === 'L' && occupied === 0) {
        next[row][col] = '#';
        changed = true;
      } else if (val === '#' && occupied >= threshold) {
        next[row][col] = 'L';
        changed = true;
      }
    }
  }

  if (!changed) {
    return next.flat().filter((x) => x === '#').length;
  }

  return next;
};

const partOne = (input) => {
  let grid = parse(input);

  do {
    grid = nextGeneration(grid, 4, true);
  } while (Array.isArray(grid));

  return grid;
};

const partTwo = (input) => {
  let grid = parse(input);
  do {
    grid = nextGeneration(grid, 5, false);
  } while (Array.isArray(grid));

  return grid;
};

exports.partOne = partOne;
exports.partTwo = partTwo;
